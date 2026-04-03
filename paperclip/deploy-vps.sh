#!/bin/bash
# ============================================================
# Paperclip AI Deployment Script for Partenaire.io VPS
# Server: 148.230.86.78 (Hostinger, Ubuntu 24.04)
#
# Runs Paperclip as a 4th service alongside:
#   - Port 3001: Next.js V2 (command center frontend)
#   - Port 8080: API backend (reports, client hub, etc.)
#   - Port 8099: Pipeline API (status, refresh)
#   - Port 3100: Paperclip AI (NEW — agent orchestration)
#
# Usage: ssh root@148.230.86.78, then run this script
# ============================================================

set -euo pipefail

echo "=========================================="
echo "  Paperclip AI — Partenaire.io Deployment"
echo "=========================================="

# -----------------------------------------------
# 1. Prerequisites
# -----------------------------------------------
echo ""
echo "[1/7] Checking prerequisites..."

# Node.js is already installed (v20.20.1)
node -v || { echo "ERROR: Node.js not found"; exit 1; }

# Install pnpm (required by Paperclip)
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
else
    echo "pnpm already installed: $(pnpm -v)"
fi

# Install PM2 for process management
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
    pm2 startup systemd -u root --hp /root
else
    echo "PM2 already installed: $(pm2 -v)"
fi

# -----------------------------------------------
# 2. Install Paperclip
# -----------------------------------------------
echo ""
echo "[2/7] Installing Paperclip AI..."

PAPERCLIP_DIR="/opt/paperclip"

if [ -d "$PAPERCLIP_DIR" ]; then
    echo "Paperclip directory exists. Updating..."
    cd "$PAPERCLIP_DIR"
    git pull origin main || true
else
    echo "Cloning Paperclip..."
    git clone https://github.com/paperclipai/paperclip.git "$PAPERCLIP_DIR"
    cd "$PAPERCLIP_DIR"
fi

echo "Installing dependencies..."
pnpm install

# -----------------------------------------------
# 3. Configure Paperclip instance
# -----------------------------------------------
echo ""
echo "[3/7] Configuring Paperclip instance..."

INSTANCE_DIR="$HOME/.paperclip/instances/partenaire-ops"
mkdir -p "$INSTANCE_DIR"

# Create config if it doesn't exist
if [ ! -f "$INSTANCE_DIR/config.json" ]; then
    cat > "$INSTANCE_DIR/config.json" << 'CONFIGEOF'
{
  "server": {
    "port": 3100,
    "host": "127.0.0.1"
  },
  "database": {
    "type": "embedded"
  },
  "instance": {
    "id": "partenaire-ops",
    "name": "Partenaire.io Operations"
  }
}
CONFIGEOF
    echo "Config created at $INSTANCE_DIR/config.json"
else
    echo "Config already exists."
fi

# -----------------------------------------------
# 4. Set up environment variables
# -----------------------------------------------
echo ""
echo "[4/7] Setting up environment..."

ENV_FILE="$INSTANCE_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
    cat > "$ENV_FILE" << 'ENVEOF'
# Paperclip AI — Partenaire.io Ops
PAPERCLIP_INSTANCE_ID=partenaire-ops
PAPERCLIP_PORT=3100

# Anthropic (Claude API for agents)
ANTHROPIC_API_KEY=sk-ant-REPLACE_ME

# Stripe (Revenue & Invoicing)
STRIPE_SECRET_KEY=sk_live_REPLACE_ME
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_ME

# PandaDoc (Contracts & Proposals)
PANDADOC_API_KEY=REPLACE_ME

# Supabase (Bridge to Command Center)
SUPABASE_URL=https://REPLACE_ME.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ_REPLACE_ME

# Slack (Alert Notifications)
SLACK_OPS_WEBHOOK_URL=https://hooks.slack.com/services/REPLACE_ME

# SMS Alerts (P0 Critical — via Twilio)
TWILIO_ACCOUNT_SID=AC_REPLACE_ME
TWILIO_AUTH_TOKEN=REPLACE_ME
TWILIO_FROM_NUMBER=+1REPLACE_ME
BOARD_PHONE_NUMBER=+1REPLACE_ME
ENVEOF
    echo ""
    echo "=================================================="
    echo "  IMPORTANT: Edit $ENV_FILE"
    echo "  Replace all REPLACE_ME values with your real keys"
    echo "=================================================="
    echo ""
else
    echo "Environment file already exists."
fi

# -----------------------------------------------
# 5. Copy company config (agents, skills, governance)
# -----------------------------------------------
echo ""
echo "[5/7] Copying Partenaire.io company config..."

COMPANY_DIR="/opt/paperclip-partenaire"
mkdir -p "$COMPANY_DIR"

# Clone/update the repo to get the paperclip/ config
if [ -d "$COMPANY_DIR/.git" ]; then
    cd "$COMPANY_DIR"
    git pull origin claude/setup-paperclip-ai-8Mzqd || true
else
    git clone -b claude/setup-paperclip-ai-8Mzqd \
        https://github.com/erick781/Partenaire.io.git "$COMPANY_DIR"
fi

echo "Company config ready at $COMPANY_DIR/paperclip/"

# -----------------------------------------------
# 6. Start Paperclip with PM2
# -----------------------------------------------
echo ""
echo "[6/7] Starting Paperclip with PM2..."

cd "$PAPERCLIP_DIR"

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'PM2EOF'
module.exports = {
  apps: [{
    name: 'paperclip',
    script: 'node_modules/.bin/paperclipai',
    args: 'run --instance partenaire-ops',
    cwd: '/opt/paperclip',
    env_file: '/root/.paperclip/instances/partenaire-ops/.env',
    env: {
      NODE_ENV: 'production',
      PAPERCLIP_INSTANCE_ID: 'partenaire-ops',
      PAPERCLIP_PORT: '3100'
    },
    max_memory_restart: '512M',
    restart_delay: 5000,
    max_restarts: 10,
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: '/var/log/paperclip/error.log',
    out_file: '/var/log/paperclip/out.log',
    merge_logs: true
  }]
};
PM2EOF

# Create log directory
mkdir -p /var/log/paperclip

# Start (or restart if already running)
pm2 delete paperclip 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "Paperclip started on port 3100"

# -----------------------------------------------
# 7. Update Nginx config
# -----------------------------------------------
echo ""
echo "[7/7] Updating Nginx config..."

NGINX_CONF="/etc/nginx/sites-enabled/default"

# Check if paperclip location already exists
if grep -q "paperclip" "$NGINX_CONF" 2>/dev/null; then
    echo "Paperclip Nginx config already exists. Skipping."
else
    echo ""
    echo "Add this block to your Nginx config inside the server {} block"
    echo "for app.partenaire.io (port 443), BEFORE the catch-all location /:"
    echo ""
    echo "------- COPY BELOW -------"
    cat << 'NGINXEOF'

    # Paperclip AI — Agent Orchestration Dashboard
    location /paperclip/ {
        proxy_pass http://127.0.0.1:3100/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
    }

    # Paperclip API
    location /api/paperclip/ {
        proxy_pass http://127.0.0.1:3100/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }

NGINXEOF
    echo "------- COPY ABOVE -------"
    echo ""
    echo "Then run: nginx -t && systemctl reload nginx"
fi

# -----------------------------------------------
# Done
# -----------------------------------------------
echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "=========================================="
echo ""
echo "  Paperclip:  http://127.0.0.1:3100 (internal)"
echo "  Public:     https://app.partenaire.io/paperclip/"
echo ""
echo "  Next steps:"
echo "  1. Edit /root/.paperclip/instances/partenaire-ops/.env"
echo "     (add your Stripe, PandaDoc, Supabase keys)"
echo "  2. Add the Nginx block above to your config"
echo "  3. Run: nginx -t && systemctl reload nginx"
echo "  4. Import the company:"
echo "     cd /opt/paperclip"
echo "     npx paperclipai company import --from /opt/paperclip-partenaire/paperclip"
echo "  5. Open https://app.partenaire.io/paperclip/"
echo ""
echo "  Process management:"
echo "  pm2 list              # see all services"
echo "  pm2 logs paperclip    # view logs"
echo "  pm2 restart paperclip # restart"
echo ""
echo "  Current services on this VPS:"
echo "  :3001  → Next.js V2 (command center)"
echo "  :8080  → API backend (reports, client hub)"
echo "  :8099  → Pipeline API"
echo "  :3100  → Paperclip AI (NEW)"
echo "=========================================="

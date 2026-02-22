#!/bin/bash
set -e

VPS_IP="148.230.86.78"
VPS_USER="root"
APP_DIR="/var/www/partenaire"
BRANCH="claude/build-shared-project-w2NbC"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Deploying Partenaire.io to $VPS_IP..."

# Copy .env.local to the server (secrets stay out of the repo)
echo "==> Uploading .env.local to server..."
ssh $VPS_USER@$VPS_IP "mkdir -p $APP_DIR"
scp "$SCRIPT_DIR/.env.local" $VPS_USER@$VPS_IP:$APP_DIR/.env.local
# Update APP_URL for production
ssh $VPS_USER@$VPS_IP "sed -i 's|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=http://$VPS_IP|' $APP_DIR/.env.local"

ssh $VPS_USER@$VPS_IP bash -s <<'REMOTE'
set -e

export DEBIAN_FRONTEND=noninteractive

# Install Node.js 20 if not present
if ! command -v node &>/dev/null; then
  echo "==> Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# Install git if not present
if ! command -v git &>/dev/null; then
  echo "==> Installing git..."
  apt-get install -y git
fi

# Install Nginx if not present
if ! command -v nginx &>/dev/null; then
  echo "==> Installing Nginx..."
  apt-get update
  apt-get install -y nginx
fi

# Install PM2 globally if not present
if ! command -v pm2 &>/dev/null; then
  echo "==> Installing PM2..."
  npm install -g pm2
fi

# Clone or update the repo
if [ -d /var/www/partenaire/.git ]; then
  echo "==> Updating existing repo..."
  cd /var/www/partenaire
  git fetch origin
  git checkout claude/build-shared-project-w2NbC
  git reset --hard origin/claude/build-shared-project-w2NbC
else
  echo "==> Cloning repo..."
  mkdir -p /var/www
  # Preserve .env.local if it exists
  if [ -f /var/www/partenaire/.env.local ]; then
    cp /var/www/partenaire/.env.local /tmp/.env.local.bak
  fi
  rm -rf /var/www/partenaire
  git clone https://github.com/erick781/Partenaire.io.git /var/www/partenaire
  cd /var/www/partenaire
  git checkout claude/build-shared-project-w2NbC
  # Restore .env.local
  if [ -f /tmp/.env.local.bak ]; then
    mv /tmp/.env.local.bak /var/www/partenaire/.env.local
  fi
fi

# Install dependencies and build
echo "==> Installing dependencies..."
cd /var/www/partenaire
npm install

echo "==> Building Next.js app..."
npm run build

# Start/restart with PM2
echo "==> Starting app with PM2..."
pm2 delete partenaire 2>/dev/null || true
pm2 start npm --name "partenaire" -- start -- -p 3000
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# Configure Nginx reverse proxy
echo "==> Configuring Nginx..."
cat > /etc/nginx/sites-available/partenaire <<'NGINX'
server {
    listen 80;
    server_name _;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Enable site and disable default
ln -sf /etc/nginx/sites-available/partenaire /etc/nginx/sites-enabled/partenaire
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl enable nginx
systemctl reload nginx

# Configure firewall
echo "==> Configuring firewall..."
ufw allow 22/tcp 2>/dev/null || true
ufw allow 80/tcp 2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true
ufw --force enable 2>/dev/null || true

echo ""
echo "========================================="
echo "  Deployment complete!"
echo "  Visit: http://148.230.86.78"
echo "========================================="
REMOTE

echo ""
echo "Done! Visit: http://$VPS_IP"

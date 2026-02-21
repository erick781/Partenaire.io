#!/bin/bash
set -e

VPS_IP="148.230.86.78"
VPS_USER="root"
APP_DIR="/var/www/partenaire"

echo "==> Deploying Partenaire.io to $VPS_IP..."

ssh $VPS_USER@$VPS_IP bash -s <<'REMOTE'
set -e

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

# Install PM2 globally if not present
if ! command -v pm2 &>/dev/null; then
  echo "==> Installing PM2..."
  npm install -g pm2
fi

# Clone or update the repo
if [ -d /var/www/partenaire ]; then
  echo "==> Updating existing repo..."
  cd /var/www/partenaire
  git fetch origin
  git checkout claude/build-shared-project-w2NbC
  git pull origin claude/build-shared-project-w2NbC
else
  echo "==> Cloning repo..."
  mkdir -p /var/www
  git clone https://github.com/erick781/Partenaire.io.git /var/www/partenaire
  cd /var/www/partenaire
  git checkout claude/build-shared-project-w2NbC
fi

# Install dependencies and build
echo "==> Installing dependencies..."
npm install

echo "==> Building Next.js app..."
npm run build

# Start/restart with PM2
echo "==> Starting app with PM2..."
pm2 delete partenaire 2>/dev/null || true
pm2 start npm --name "partenaire" -- start -- -p 3000
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# Open firewall port
echo "==> Configuring firewall..."
ufw allow 3000 2>/dev/null || true
ufw allow 80 2>/dev/null || true
ufw allow 443 2>/dev/null || true

echo ""
echo "==> Deployment complete!"
echo "==> Visit: http://$HOSTNAME:3000 or http://$(curl -s ifconfig.me):3000"
REMOTE

echo ""
echo "Done! Visit: http://$VPS_IP:3000"

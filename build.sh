#!/usr/bin/env bash
# Build script for Render.com deployment

echo "Building application..."

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build React
cd frontend
npm install
npm run build
cd ..

# Move React build to Laravel public directory
rm -rf public/build
mkdir -p public
cp -r frontend/build/* public/

# Run Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Seed database (only if needed for demo)
php artisan db:seed --force

echo "Build completed successfully!"

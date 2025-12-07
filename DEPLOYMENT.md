# Render.com Deployment Guide - Sports Court Booking System

## Prerequisites
- GitHub account
- Render.com account (free)

## Step 1: Prepare Your Code

### Move backend files to root
```bash
# Copy backend files to project root
cp -r backend/* .
cp backend/.env.example .env.example
```

### Update .gitignore
Add to root `.gitignore`:
```
/node_modules
/public/build
/public/hot
/public/storage
/storage/*.key
/vendor
.env
.env.backup
.phpunit.result.cache
Homestead.json
Homestead.yaml
npm-debug.log
yarn-error.log
frontend/node_modules
frontend/build
```

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Create MySQL Database on Render

1. Go to https://render.com/dashboard
2. Click "New +" → "MySQL"
3. Configure:
   - **Name**: sports-booking-db
   - **Database**: sports_booking
   - **User**: Choose a username
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click "Create Database"
5. **Save the Internal Database URL** (you'll need this)

## Step 4: Deploy Application on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: sports-booking-app
   - **Region**: Same as database
   - **Branch**: main
   - **Root Directory**: Leave empty
   - **Runtime**: PHP
   - **Build Command**: `bash build.sh`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`

4. **Environment Variables** - Add these:
   ```
   APP_NAME=SportsBooking
   APP_ENV=production
   APP_KEY=base64:GENERATE_THIS_LATER
   APP_DEBUG=false
   APP_URL=https://YOUR_APP_NAME.onrender.com
   
   DB_CONNECTION=mysql
   DB_HOST=COPY_FROM_DATABASE_INTERNAL_URL
   DB_PORT=3306
   DB_DATABASE=sports_booking
   DB_USERNAME=COPY_FROM_DATABASE
   DB_PASSWORD=COPY_FROM_DATABASE
   
   JWT_SECRET=GENERATE_RANDOM_STRING_HERE
   JWT_TTL=60
   ```

5. Click "Create Web Service"

## Step 5: Generate APP_KEY

After first deployment (will fail):
1. Go to your service's "Shell" tab
2. Run: `php artisan key:generate --show`
3. Copy the output
4. Update `APP_KEY` environment variable
5. Save and redeploy

## Step 6: Run Migrations & Seeds

In Render Shell:
```bash
php artisan migrate --force
php artisan db:seed --force
```

## Step 7: Access Your App

Your app will be available at: `https://YOUR_APP_NAME.onrender.com`

**Demo Credentials:**
- Admin: admin@example.com / password
- User: john@example.com / password

## Troubleshooting

**Build fails?**
- Check build logs in Render dashboard
- Ensure `build.sh` has execute permissions

**Database connection fails?**
- Verify database credentials from MySQL service
- Use Internal Database URL, not External

**React not loading?**
- Check if build completed successfully
- Verify `public/index.html` exists after build

**JWT errors?**
- Generate JWT_SECRET: use any 32+ character random string
- Run `php artisan jwt:secret` in shell

## Local Development

To run locally after these changes:
```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend  
cd frontend
npm start
```

Frontend will use `REACT_APP_API_URL` from `.env.local` to connect to local backend.

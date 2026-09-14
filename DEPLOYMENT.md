# Deployment Guide for Render

This guide will help you deploy your application to Render with zero errors.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A GitHub repository with this code
3. A PostgreSQL database (Render provides free PostgreSQL)

## Quick Deploy Steps

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Prepare for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Fill in:
   - **Name**: `healweal-db`
   - **Database**: `healweal`
   - **User**: `healweal_user`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 16
   - **Instance Type**: Free
4. Click "Create Database"
5. **IMPORTANT**: Copy the "Internal Database URL" - you'll need this

### Step 3: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Fill in the settings:

| Field | Value |
|-------|-------|
| **Name** | `healweal-app` (or your preferred name) |
| **Region** | Same as your database |
| **Branch** | `main` |
| **Root Directory** | Leave blank |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build && npm run db:migrate` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### Step 4: Add Environment Variables

In the "Environment" section, add these variables:

1. **NODE_ENV**
   - Value: `production`

2. **DATABASE_URL**
   - Value: Paste the "Internal Database URL" from Step 2
   - This should look like: `postgresql://user:password@host/database`

3. **SESSION_SECRET**
   - Value: Generate a random string (at least 32 characters)
   - You can use: `openssl rand -base64 32` to generate one
   - Or use any random string generator

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build the frontend (React + Vite)
   - Build the backend (Express + TypeScript)
   - Run database migrations
   - Start your application

## Post-Deployment

### Access Your Application

Your app will be available at: `https://healweal-app.onrender.com` (or your chosen name)

### Seed the Database (First Time Only)

After the first deployment, you'll need to seed the database with initial data:

1. Go to your web service dashboard
2. Click "Shell" tab
3. Run:
   ```bash
   npm run db:seed
   ```

This will create:
- Initial admin user (username configured via `ADMIN_INITIAL_USERNAME`, password from `ADMIN_INITIAL_PASSWORD` or securely auto-generated in deployment logs)
- Initial content sections
- Media assets

### Access Admin Panel

1. Navigate to: `https://your-app.onrender.com/admin/login`
2. Login with your configured `ADMIN_INITIAL_USERNAME` and `ADMIN_INITIAL_PASSWORD` (or the auto-generated password output in the Render deployment logs).
3. Access the Admin Panel at `/admin/users` to manage admin credentials.

## Monitoring & Troubleshooting

### View Logs

1. Go to your web service dashboard
2. Click "Logs" tab
3. Check for any errors during build or runtime

### Common Issues

#### Issue: Build fails with "DATABASE_URL not set"

**Solution**: Make sure you added the DATABASE_URL environment variable correctly.

#### Issue: Migration fails

**Solution**: 
1. Check that your DATABASE_URL is correct
2. Ensure your database is running
3. Check the logs for specific error messages

#### Issue: App shows 404 or blank page

**Solution**:
1. Check that the build command completed successfully
2. Verify that `dist/public` folder was created
3. Check browser console for errors

#### Issue: Database connection errors

**Solution**:
1. Use the "Internal Database URL" not the "External Database URL"
2. Ensure both your database and web service are in the same region
3. Check that the database is not paused (free tier databases pause after inactivity)

### Performance Notes

- **Free Tier**: Your app will spin down after 15 minutes of inactivity
- **Cold Start**: First request after spin-down may take 30-60 seconds
- **Database**: Free tier database is limited to 1GB storage

## Auto-Deploy

Render automatically deploys when you push to your GitHub main branch:

```bash
git add .
git commit -m "Update feature"
git push
```

Render will detect the push and automatically rebuild and redeploy.

## Manual Scripts

If you need to run migrations or seed manually:

### SSH into your service:

1. Go to web service dashboard
2. Click "Shell" tab
3. Run commands:

```bash
# Run migrations only
npm run db:migrate

# Seed database
npm run db:seed
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| NODE_ENV | Yes | Environment mode | `production` |
| DATABASE_URL | Yes | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| SESSION_SECRET | Yes | Secret for session encryption | Random 32+ char string |
| PORT | No | Port (Auto-set by Render) | `10000` |

## Health Check

Render automatically monitors your app at: `/api/content`

If this endpoint fails, Render will restart your service.

## Security Checklist

- [ ] Changed admin password from default `admin`
- [ ] Set strong SESSION_SECRET (32+ random characters)
- [ ] DATABASE_URL is kept secret (never commit to Git)
- [ ] Reviewed and removed any debug/test code
- [ ] Confirmed HTTPS is enabled (automatic on Render)

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check your deployment logs for specific errors

## Cost

- Free tier includes:
  - Web service (750 hours/month)
  - PostgreSQL database (1GB, pauses after 90 days inactive)
  - Automatic SSL
  - Custom domain support

---

**Your app is now live! 🎉**

Visit `https://your-app-name.onrender.com` to see it in action.

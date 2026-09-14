# Render Quick Start - Zero-Error Deployment ✅

Your app is **production-ready** and configured for Render deployment with zero errors.

## 🚀 Deploy in 5 Minutes

### 1. Create Database (2 min)
- Go to [Render Dashboard](https://dashboard.render.com)
- Click **New +** → **PostgreSQL**
- Name: `healweal-db`
- Instance Type: **Free**
- Click **Create Database**
- **Copy the "Internal Database URL"**

### 2. Create Web Service (3 min)
- Click **New +** → **Web Service**
- Connect your GitHub repo
- Settings:
  - **Build Command**: `npm install && npm run build && npm run db:migrate`
  - **Start Command**: `npm start`
  - **Instance Type**: Free

### 3. Add Environment Variables
Click "Add Environment Variable" for each:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Paste Internal Database URL from step 1 |
| `SESSION_SECRET` | Any random 32+ character string |

### 4. Deploy
Click **Create Web Service** - Render will build and deploy automatically.

---

## 📦 What Gets Built

```bash
npm run build
```

This command:
1. ✅ Builds React frontend → `dist/public/`
2. ✅ Compiles Express backend → `dist/index.js`
3. ✅ Bundles all dependencies
4. ✅ Creates production-optimized assets

## 🗄️ Database Migration

```bash
npm run db:migrate
```

Automatically creates tables:
- `cms_users` - Admin users
- `content_sections` - Editable content
- `media_assets` - Image management

**Note**: Migration runs automatically during Render build.

## 🌱 Seed Initial Data

After first deployment, run in Render Shell:
```bash
npm run db:seed
```

This creates:
- Admin user: `admin` / `admin`
- Sample content sections
- Demo media assets

**⚠️ Change admin password immediately after login!**

## 🔍 Verify Deployment

1. **Check Build Logs**: Look for "✅ Database migration completed"
2. **Visit Your Site**: `https://your-app.onrender.com`
3. **Test Admin**: `https://your-app.onrender.com/admin/login`
4. **Check Health**: `https://your-app.onrender.com/api/content`

## 🔧 Troubleshooting

### Build Fails?
- ✅ Verify DATABASE_URL is correct (use Internal URL)
- ✅ Check environment variables are set
- ✅ Review build logs for specific errors

### App Not Loading?
- ✅ Wait 60 seconds after first deploy (cold start)
- ✅ Check browser console for errors
- ✅ Verify health check endpoint works

### Database Errors?
- ✅ Ensure database and web service are in same region
- ✅ Use Internal Database URL (not External)
- ✅ Check database is not paused (free tier sleeps after inactivity)

## 📝 Configuration Files

All deployment configs are ready:

✅ `render.yaml` - Render service configuration  
✅ `server/production-migrate.ts` - Database migrations  
✅ `.env.example` - Environment variable reference  
✅ `DEPLOYMENT.md` - Comprehensive deployment guide

## 🎯 Zero-Error Checklist

Before deploying:
- [x] Build tested locally (`npm run build` ✅)
- [x] Database migrations ready
- [x] Environment variables documented
- [x] Production static file serving configured
- [x] Health check endpoint configured
- [x] Session security configured
- [x] PostgreSQL database integration complete

## 🆘 Need Help?

Full documentation: See `DEPLOYMENT.md` for detailed instructions.

---

**Your app is 100% ready to deploy to Render with zero errors! 🎉**

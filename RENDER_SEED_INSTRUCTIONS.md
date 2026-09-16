# How to Fix Your Render Database

## The Problem
You're seeing a "Login failed" error with a 500 Internal Server Error. This means **the database tables don't exist yet**. You need to run TWO scripts in order:
1. Migration script (creates the tables)
2. Seed script (adds data including the admin user)

## Solution: Run BOTH Scripts in Order

### Step 1: Create the Database Tables

1. **Open Render Dashboard**
   - Go to https://dashboard.render.com
   - Click on your web service (healweal-app or HEALWEAL)

2. **Open the Shell**
   - Click on the **"Shell"** tab in the left sidebar
   - Wait for the shell to connect (you'll see a command prompt)

3. **Run the MIGRATION Command First**
   ```bash
   npx tsx server/render-migrate.ts
   ```

4. **Wait for Success Message**
   You should see:
   ```
   Starting migration...
   Connecting to database...
   Creating tables...
   ✅ Migration completed successfully
   ```

### Step 2: Add Data to the Database

5. **Run the SEED Command**
   ```bash
   npx tsx server/render-seed.ts
   ```

6. **Wait for Success Message**
   You should see:
   ```
   Connecting to database...
   Ensuring PostgreSQL extensions are enabled...
   Seeding database...
   Creating admin user...
   Adding content sections...
   Adding media assets...
   Adding site settings...
   Adding SEO metadata...
   ✅ Database seeded successfully!
   ```

### Step 3: Try Logging In

7. **Login with Admin Credentials**
   - Go to your website: `https://healwealcorp.onrender.com/admin/login` (or your custom domain)
   - Username: Your configured `ADMIN_INITIAL_USERNAME` (or `admin`)
   - Password: Your configured `ADMIN_INITIAL_PASSWORD` (or the auto-generated password logged in step 6)
   - **🚨 IMPORTANT: You can manage and create additional admin users in the Admin Panel (`/admin/users`).**

### Option 2: Using Manual Build Hook (Alternative)

If the shell doesn't work, you can trigger a manual deploy:

1. Go to your Render Dashboard
2. Click on your web service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Once deployed, use Option 1 to run the seed script

## Default Login Credentials

After seeding:
- **Username**: `admin`
- **Password**: `admin`

**🚨 CRITICAL SECURITY WARNING**: Change this password immediately after first login! The default credentials are publicly known and must be changed to secure your admin panel.

## What the Seed Script Creates

1. **Admin User**: Username `admin` with password `admin`
2. **Content Sections**: Sample content for all pages (home, about, brands, careers, media, contact)
3. **Media Assets**: Placeholder media references
4. **Site Settings**: General settings, contact info, and social media links
5. **SEO Metadata**: Optimized titles, descriptions, and keywords for all pages

## Troubleshooting

### "DATABASE_URL is not set"
- Your environment variable is missing
- Go to Render Dashboard → Your Service → Environment
- Verify `DATABASE_URL` is set with your PostgreSQL internal connection string

### "Connection timeout"
- Your database and web service are in different regions
- They must be in the same region to communicate

### "Permission denied"
- Your database user doesn't have permission to create extensions
- This shouldn't happen on Render's managed PostgreSQL, contact Render support

### Still seeing login errors?
1. Check the Render logs for the specific error message:
   - Go to your service → **Logs** tab
   - Look for lines starting with "Login failed:"
   - The log will tell you exactly what's wrong (user not found, wrong password, etc.)

2. Verify the seed script ran successfully:
   - Run the seed command again
   - Check for the success message

## After Seeding Successfully

1. **Change Admin Password**
   - Login with `admin` / `admin`
   - Go to Settings or User Management
   - Change the password to something secure

2. **Update Content**
   - Go to Content Manager
   - Replace sample content with your actual content

3. **Upload Media**
   - Go to Media Manager
   - Upload your logos and images

4. **Configure Settings**
   - Go to Settings
   - Update contact information
   - Add your social media URLs

5. **Optimize SEO**
   - Go to SEO Manager
   - Update meta titles and descriptions for each page

## Need More Help?

- Check Render documentation: https://render.com/docs
- Review the main deployment guide: `RENDER_DEPLOYMENT_CHECKLIST.md`
- Check application logs in Render Dashboard for specific error messages

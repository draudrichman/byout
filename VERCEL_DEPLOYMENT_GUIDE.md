# Vercel Deployment Guide

## Issue: Tech and Retail Pages Not Showing on Vercel

### Problem
When navigating to `/tech` or `/retail` routes directly or refreshing the page, Vercel returns a 404 error. This happens because:

1. We removed React Router DOM and now use native link navigation
2. Your app uses `window.location.pathname` to determine which page to show
3. Vercel doesn't know to serve `index.html` for these routes by default

### Solution

Created `vercel.json` configuration file to tell Vercel to serve `index.html` for ALL routes:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This means:
- ✅ `/` → serves index.html → React shows HomePage
- ✅ `/tech` → serves index.html → React shows TechPage
- ✅ `/tech/hph` → serves index.html → React shows HPH Detail
- ✅ `/tech/pef` → serves index.html → React shows PEF Detail
- ✅ `/retail` → serves index.html → React shows RetailChannelPage

## How to Deploy

### Option 1: Automatic Deployment (Recommended)

1. **Commit the vercel.json file:**
   ```bash
   git add vercel.json
   git commit -m "Add Vercel configuration for client-side routing"
   git push
   ```

2. **Vercel will automatically redeploy** with the new configuration

3. **Test all routes:**
   - `https://your-site.vercel.app/`
   - `https://your-site.vercel.app/tech`
   - `https://your-site.vercel.app/tech/hph`
   - `https://your-site.vercel.app/tech/pef`
   - `https://your-site.vercel.app/retail`

### Option 2: Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Or deploy to production
vercel --prod
```

## Vercel Configuration Explained

### Rewrites Section
```json
"rewrites": [
  {
    "source": "/(.*)",      // Match ALL routes
    "destination": "/index.html"  // Serve index.html for all
  }
]
```

This tells Vercel: "For any URL path, serve the index.html file." Your React app then reads `window.location.pathname` and displays the correct page.

### Headers Section (Optional - for performance)
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  },
  {
    "source": "/index.html",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "no-cache, no-store, must-revalidate"
      }
    ]
  }
]
```

This optimizes caching:
- Static assets (JS, CSS, images) are cached for 1 year
- `index.html` is never cached, so users always get the latest version

## Alternative: Using Netlify

If you want to use Netlify instead, we've also created a `public/_redirects` file:

```
/*    /index.html   200
```

This works the same way for Netlify hosting.

## Testing Locally

To test the routing locally:

```bash
# Build the project
npm run build

# Serve the build folder
npx serve dist

# Or use Vercel CLI
vercel dev
```

Then test these URLs:
- http://localhost:3000/
- http://localhost:3000/tech
- http://localhost:3000/tech/hph
- http://localhost:3000/tech/pef
- http://localhost:3000/retail

## Troubleshooting

### Issue: Still getting 404 errors after deployment

**Solution:**
1. Make sure `vercel.json` is in the root directory (same level as `package.json`)
2. Check that the file was committed to your repository
3. Redeploy on Vercel (Settings → Deployments → Redeploy)

### Issue: Pages load but no content shows

**Solution:**
1. Open browser DevTools (F12) → Console
2. Check for JavaScript errors
3. Verify all imports in your components are correct
4. Check that all asset paths are correct (should be relative to `public/` folder)

### Issue: Assets not loading (images, fonts, etc.)

**Solution:**
1. Make sure assets are in the `public/` folder
2. Reference them without `/public` prefix
3. Example: `/img/logo.png` NOT `/public/img/logo.png`

### Issue: Getting "Module not found" errors

**Solution:**
1. Run `npm install` to ensure all dependencies are installed
2. Check import paths in your components
3. Make sure all imported files exist at the specified paths

## Project Structure

```
byout-website/
├── vercel.json          ← Vercel configuration (NEW)
├── public/
│   ├── _redirects       ← Netlify configuration (NEW)
│   └── ...
├── src/
│   ├── App.jsx          ← Uses window.location.pathname
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TechPage.jsx
│   │   ├── RetailChannelPage.jsx
│   │   └── tech/
│   │       ├── MainPage.jsx
│   │       ├── HPHDetailPage.jsx
│   │       └── PEFDetailPage.jsx
│   └── ...
└── package.json
```

## How Your App Routing Works Now

1. User visits `https://your-site.vercel.app/tech`
2. Vercel receives the request
3. Vercel checks `vercel.json` → rewrites request to `/index.html`
4. Browser loads `index.html` with your React app
5. React app starts, reads `window.location.pathname` (which is `/tech`)
6. `App.jsx` component sees pathname is `/tech`
7. `getCurrentPage()` function returns `<TechPage />`
8. User sees the Tech page ✅

## Deployment Checklist

- [x] Created `vercel.json` file
- [x] Created `public/_redirects` file
- [ ] Commit both files to repository
- [ ] Push to GitHub/GitLab/etc
- [ ] Verify Vercel redeployed automatically
- [ ] Test all routes on production URL
- [ ] Check browser console for errors
- [ ] Verify all assets load correctly

## Support

If you continue having issues:

1. Check the Vercel deployment logs in your dashboard
2. Look for build errors or warnings
3. Test locally with `npm run build && npx serve dist`
4. Verify the `vercel.json` file is correctly formatted JSON

---

**Deployment configured on:** October 11, 2025  
**Configuration files created:**
- `vercel.json` (Vercel)
- `public/_redirects` (Netlify/others)


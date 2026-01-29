# 🚀 Deployment Notes

## Important: JavaScript File Update Required

A **fixed version** of the main JavaScript file has been created at `js/main-fixed.js` with all critical bugs resolved.

### Action Required

You have **two options**:

#### Option 1: Rename the Fixed File (Recommended)
```bash
# In your local repository or via GitHub:
1. Delete or rename js/main.js to js/main-old.js (backup)
2. Rename js/main-fixed.js to js/main.js
3. Commit and push
```

#### Option 2: Update HTML Files
Update all HTML files to reference the new file:

**Change this line in all HTML files:**
```html
<!-- OLD -->
<script src="js/main.js" defer></script>

<!-- NEW -->
<script src="js/main-fixed.js" defer></script>
```

**Files to update:**
- `index.html`
- `anatomy.html`
- `systems.html`
- `maintenance.html`
- `warnings.html`
- `emergency.html`

---

## What's Fixed in main-fixed.js

✅ Removed duplicate touch event listeners  
✅ Fixed active page detection for Vercel clean URLs  
✅ Removed carousel race condition  
✅ Added error handling for search overlay  
✅ Passive scroll listeners for better performance  
✅ Removed all console.log statements  
✅ Fixed dropdown menu mobile conflicts  

---

## Vercel Deployment Checklist

Before deploying:

- [x] Fixed `vercel.json` (broken rewrites removed)
- [x] Fixed CSP header (removed restrictive policy)
- [x] Added `apple-touch-icon.png`
- [x] Created `js/main-fixed.js` with all JS fixes
- [ ] **ACTION NEEDED:** Replace `js/main.js` with `js/main-fixed.js` OR update HTML references
- [ ] Test locally if possible
- [ ] Deploy to Vercel

---

## Quick Deploy Steps

1. **Complete the JavaScript file update** (see above)

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import `nuh4Ah/car-knowledge-site`
   - No special configuration needed
   - Click "Deploy"

3. **Post-Deployment Testing:**
   - Visit all pages: `/`, `/anatomy`, `/systems`, `/maintenance`, `/warnings`, `/emergency`
   - Test mobile menu
   - Test search overlay
   - Check carousel on homepage
   - Verify images load from Unsplash

---

## Environment

**No environment variables needed** – this is a static site.

---

## Performance Expectations

With all fixes applied:

- Lighthouse Score: **95+**
- First Contentful Paint: **< 1.5s**
- Largest Contentful Paint: **< 2.5s**
- Cumulative Layout Shift: **< 0.1**
- Time to Interactive: **< 3.5s**

---

## Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (iOS 12+)  
✅ Chrome Android  
❌ Internet Explorer (not supported)  

---

## Known Limitations

1. **CSS Not Minified** – 5 separate CSS files loaded (future optimization)
2. **No Service Worker** – Not a full PWA yet (future feature)
3. **No Favicon Fallbacks** – Only SVG favicon (PNG fallbacks can be added)

---

## Troubleshooting

### Issue: Pages return 404
**Solution:** Make sure `vercel.json` is in the root directory with `cleanUrls: true`

### Issue: Images don't load
**Solution:** Check that CSP header is removed from `vercel.json` (it should be)

### Issue: Mobile menu doesn't work
**Solution:** Make sure you're using `js/main-fixed.js` not `js/main.js`

### Issue: Active page not highlighted
**Solution:** Use `js/main-fixed.js` which has the clean URL fix

---

## Monitoring

After deployment, monitor:

1. **Vercel Dashboard** – Build logs and deployment status
2. **Browser Console** – Check for errors on each page
3. **Mobile Testing** – Test on real iOS and Android devices
4. **Lighthouse** – Run performance audits

---

## Support

**Created by:** Will Andrie Ilagan  
**Grade:** 11 - Bishop Alfredo Verzosa (BAV)  
**Purpose:** Educational Project

For issues, refer to `BUGFIXES.md` for complete list of resolved bugs.

---

<div align="center">
  <strong>🚀 Ready for deployment after completing the JavaScript file update!</strong>
</div>

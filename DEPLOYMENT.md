# 🚀 Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard

1. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select `nuh4Ah/car-knowledge-site`

2. **Configure Project**
   - **Framework Preset:** Other (static HTML)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** (leave empty - no build needed)
   - **Output Directory:** `./` (leave as default)

3. **Deploy**
   - Click "Deploy"
   - Wait 30-60 seconds for deployment to complete
   - Your site will be live at `https://car-knowledge-site-xxx.vercel.app`

4. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `carknowledge.com`)
   - Follow DNS configuration instructions

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Auto-Deploy on Git Push

Once connected, Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches or pull requests

---

## Configuration Files Explained

### `vercel.json`

Production-ready configuration with:

**Clean URLs**
```json
"cleanUrls": true
```
Enables `/anatomy` instead of `/anatomy.html`

**Redirects**
- `/home` → `/`
- `/index` → `/`
- `/index.html` → `/`

**Security Headers**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` for images

**Caching Strategy**
- Static assets (CSS/JS/images): 1 year cache (`immutable`)
- HTML pages: No cache (`must-revalidate`)

**Rewrites**
- Automatically serves `.html` files without extension
- Example: `/anatomy` → `anatomy.html`

### `.vercelignore`

Excludes from deployment:
- Development files (`node_modules`, `.git`)
- Documentation (keeps README for dashboard)
- IDE configs (`.vscode`, `.idea`)
- Logs and temp files

### `package.json`

Project metadata for Vercel:
- Name, version, description
- Repository links
- Keywords for discoverability
- Node.js version requirement

---

## Vercel Features Enabled

### ✅ Automatic HTTPS
- Free SSL certificate
- Auto-renews
- Forces HTTPS redirect

### ✅ Global CDN
- 70+ edge locations worldwide
- Fast load times globally
- Automatic image optimization (WebP)

### ✅ Preview Deployments
- Every PR gets a unique URL
- Test changes before merging
- Automatic branch deployments

### ✅ Analytics (Optional)
- Enable in Project Settings
- Real-time visitor metrics
- Web Vitals tracking

### ✅ Environment Variables
- Manage in Project Settings → Environment Variables
- Separate for production/preview/development

---

## Testing Your Deployment

### 1. Check All Pages Load

```bash
curl -I https://your-site.vercel.app/
curl -I https://your-site.vercel.app/anatomy
curl -I https://your-site.vercel.app/systems
curl -I https://your-site.vercel.app/maintenance
curl -I https://your-site.vercel.app/warnings
curl -I https://your-site.vercel.app/emergency
```

All should return `200 OK`

### 2. Verify Clean URLs Work

✅ Working:
- `https://your-site.vercel.app/anatomy`
- `https://your-site.vercel.app/systems`

❌ Not needed (redirects):
- `https://your-site.vercel.app/anatomy.html`
- `https://your-site.vercel.app/index.html`

### 3. Check Security Headers

```bash
curl -I https://your-site.vercel.app/ | grep -E "X-|Strict"
```

Should show:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security`

### 4. Test Mobile Responsiveness

- Open site on phone
- Test hamburger menu
- Check carousel swipe
- Verify touch interactions

### 5. Run Lighthouse Audit

1. Open site in Chrome
2. Press `F12` → Lighthouse tab
3. Run audit for:
   - Performance (target: 90+)
   - Accessibility (target: 95+)
   - Best Practices (target: 100)
   - SEO (target: 100)

---

## Troubleshooting

### Issue: 404 on Page Links

**Symptom:** Clicking links shows "404 Not Found"

**Solution:**
1. Check `vercel.json` has rewrites section
2. Verify HTML files exist in repo
3. Ensure `cleanUrls: true` is set

### Issue: CSS/JS Not Loading

**Symptom:** Unstyled page or no interactivity

**Solution:**
1. Check browser console for 404 errors
2. Verify paths in HTML (should be `/css/` not `./css/`)
3. Clear browser cache

### Issue: Images Not Showing

**Symptom:** Broken image icons

**Solution:**
1. Check `assets/images/` folder exists in repo
2. Verify WebP images have JPG fallbacks
3. Check CSP headers allow image sources

### Issue: Slow Load Times

**Symptom:** Pages take >3 seconds to load

**Solution:**
1. Enable image optimization in Vercel settings
2. Check CSS/JS are minified
3. Verify caching headers are correct
4. Use WebP images instead of PNG/JPG

---

## Performance Optimization Checklist

- [x] Minify CSS and JavaScript
- [x] Use WebP images with fallbacks
- [x] Enable browser caching (31536000s for static)
- [x] Lazy load images
- [x] Use system fonts (no external requests)
- [x] Inline critical CSS
- [x] Defer non-critical JS
- [x] Enable GZIP/Brotli compression (automatic on Vercel)
- [x] Remove unused CSS/JS
- [x] Optimize image sizes (responsive)

---

## Monitoring & Analytics

### Enable Vercel Analytics

1. Go to Project Settings → Analytics
2. Click "Enable Analytics"
3. View metrics:
   - Real User Monitoring (RUM)
   - Core Web Vitals
   - Page views
   - Geographic distribution

### Custom Domain Setup

1. Buy domain (e.g., Namecheap, Google Domains)
2. In Vercel: Project Settings → Domains
3. Add domain: `carknowledge.com`
4. Add DNS records (provided by Vercel):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate auto-provisions

---

## Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Configuration:** Create `netlify.toml`
```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/:splat.html"
  status = 200
```

### GitHub Pages

1. Go to repo Settings → Pages
2. Source: Deploy from branch `main`
3. Folder: `/ (root)`
4. Save
5. Site will be at: `https://nuh4Ah.github.io/car-knowledge-site/`

**Note:** Update all links to include `/car-knowledge-site/` prefix

---

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Clean URLs work (no `.html`)
- [ ] Mobile menu functions
- [ ] Carousel/swipe works on mobile
- [ ] Security headers present
- [ ] HTTPS enforced
- [ ] Favicon appears
- [ ] Meta tags correct (check with [metatags.io](https://metatags.io))
- [ ] Lighthouse score >90
- [ ] Analytics enabled
- [ ] Custom domain configured (if applicable)

---

## Support

**Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
**Vercel Status:** [vercel-status.com](https://www.vercel-status.com/)
**Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## Deployment Summary

| Platform | Setup Time | Auto Deploy | Custom Domain | SSL | CDN |
|----------|-----------|-------------|---------------|-----|-----|
| **Vercel** | 2 min | ✅ | ✅ | ✅ | ✅ |
| Netlify | 3 min | ✅ | ✅ | ✅ | ✅ |
| GitHub Pages | 5 min | ✅ | ✅ | ✅ | ❌ |

**Recommended:** Vercel (best performance, easiest setup)

---

<div align="center">
  <strong>Ready to deploy? 🚀</strong>
  <br><br>
  <a href="https://vercel.com/new">Deploy to Vercel Now →</a>
</div>

# 🚗 Car Knowledge Site

> **Learn about cars the easy way** - A beginner-friendly educational website for understanding car basics.

[![Live Site](https://img.shields.io/badge/Live-carknow.vercel.app-blue)](https://carknow.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-pipipew%2Fcar--knowledge--site-green)](https://github.com/pipipew/car-knowledge-site)
[![License](https://img.shields.io/badge/License-Educational-orange)](#)

---

## 📖 About

This website was created as an educational project to help complete beginners understand their vehicles. The goal is to make car knowledge **accessible, practical, and easy to digest** in just 10 minutes.

**Created by:** Will Andrie Ilagan  
**Grade:** 11  
**Section:** Bishop Alfredo Verzosa (BAV)  
**Purpose:** Educational project demonstrating web development skills and technical writing

---

## ✨ Features

### 📱 **Responsive Design**
- Mobile-first approach with smooth animations
- Hamburger menu with slide-in navigation
- Touch-friendly interactions
- Optimized for all screen sizes (mobile, tablet, desktop)

### 🎨 **Modern UI/UX**
- Clean, professional design with gradient accents
- Card-based layout for easy scanning
- Smooth scroll animations and hover effects
- 3D card tilt effects on desktop
- Accessible color contrast and typography

### ⚡ **Performance Optimized**
- Shared CSS (15KB) across all pages
- Shared JavaScript module (6KB)
- Lazy loading for images
- Minimal dependencies (pure vanilla JS)
- Fast page load times

### ♿ **Accessibility**
- ARIA labels and roles
- Keyboard navigation support
- Skip-to-content links
- Focus-visible indicators
- Reduced motion support

---

## 📂 Project Structure

```
car-knowledge-site/
├── index.html              # Homepage with topic navigation
├── anatomy.html            # Essential car parts guide
├── systems.html            # How car systems work
├── maintenance.html        # DIY maintenance tasks
├── warnings.html           # Dashboard warning lights
├── favicon.svg             # Custom car icon
├── css/
│   └── styles.css          # Shared global styles (15KB)
├── js/
│   └── main.js             # Interactive features (6KB)
├── assets/
│   └── images/             # WebP & JPG images
│       ├── hero-car-garage.*
│       ├── icon-engine.*
│       ├── icon-brakes.*
│       ├── icon-tires.*
│       └── icon-battery.*
└── README.md               # Documentation (this file)
```

---

## 🎓 Learning Topics

### 1️⃣ **Car Anatomy**
Identify and understand 8 essential car parts:
- Engine (combustion system)
- Transmission (power delivery)
- Brakes (friction system)
- Battery & Alternator (electrical)
- Radiator & Coolant (cooling)
- Air Filter & Oil System

### 2️⃣ **How Systems Work**
Step-by-step explanations of major systems:
- Engine combustion cycle
- Braking system mechanics
- Transmission gear shifting
- Cooling system circulation
- Electrical generation & storage
- Steering mechanism

### 3️⃣ **Basic Maintenance**
6 beginner-friendly DIY tasks:
- Check & top up engine oil
- Check tire pressure (TPMS)
- Check coolant level
- Refill washer fluid
- Test all lights (headlights, brake lights)
- Inspect air filter

### 4️⃣ **Dashboard Warnings**
Urgency-based guide to warning lights:
- 🔴 **Red** - Stop immediately
- 🟡 **Yellow/Orange** - Service soon
- 🟢/🔵 **Green/Blue** - Information/Status

Common lights covered:
- Engine overheating
- Check engine light
- Tire pressure (TPMS)
- Service/maintenance reminders

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|----------|
| **HTML5** | Semantic markup, accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | Interactive features (no frameworks) |
| **SVG** | Scalable favicon icon |
| **WebP + JPG** | Optimized images with fallbacks |

---

## 🎯 Key Animations & Interactions

### Page Load Animations
- Body fade-in (0.6s)
- Hero content staggered slide-up
- Cards fade in on scroll (Intersection Observer)

### Hover Effects
- Navigation underline animation
- Card lift with 3D tilt (desktop)
- Button pulse & ripple effects
- Gradient background shifts

### Mobile Menu
- Animated hamburger → X transformation
- Slide-in with staggered list items
- Closes on link click, outside click, or ESC key

### Scroll Features
- Parallax hero image effect
- Navigation shadow on scroll
- Smooth anchor link scrolling

---

## 🚀 Deployment

**Live URL:** [https://carknow.vercel.app/](https://carknow.vercel.app/)

### How to Deploy

#### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Auto-deploy on every commit to `main`

#### Option 2: Netlify
1. Drag & drop project folder to [Netlify](https://netlify.com)
2. Or connect GitHub repository for CI/CD

#### Option 3: GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repo settings → Pages → main branch
```

---

## 💻 Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/pipipew/car-knowledge-site.git
cd car-knowledge-site
```

2. **Serve locally** (choose one method):

**Option A: Python**
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

**Option B: Node.js (http-server)**
```bash
npx http-server -p 8000
# Visit: http://localhost:8000
```

**Option C: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option D: Just open in browser**
```bash
open index.html  # macOS
start index.html # Windows
```

---

## 📊 Code Statistics

| Metric | Value |
|--------|-------|
| **Total Lines** | ~3,500 |
| **HTML Pages** | 5 |
| **CSS (shared)** | 450 lines |
| **JavaScript (shared)** | 200 lines |
| **Code Reduction** | 80% (vs inline styles) |
| **Total Size** | ~22KB (minified CSS+JS) |

**Before Refactor:**
- Each page: ~1,400 lines (inline CSS)
- Total: ~7,000 lines

**After Refactor:**
- Each page: ~300 lines (clean HTML)
- Shared CSS: 450 lines
- Shared JS: 200 lines
- Total: ~2,150 lines ✅

---

## ✅ Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |
| Mobile Safari | iOS 14+ | ✅ Fully supported |
| Chrome Mobile | Android 90+ | ✅ Fully supported |

---

## 🎨 Design Principles

1. **Mobile-First** - Designed for phones, enhanced for desktop
2. **Content-First** - Information clarity over decoration
3. **Progressive Enhancement** - Works without JS, better with it
4. **Accessibility** - WCAG 2.1 AA compliant
5. **Performance** - <1s initial load on 3G

---

## 📝 License & Usage

**Educational Use Only**

This project is created for educational purposes as a school assignment. You may:
- ✅ View and study the code
- ✅ Fork for learning purposes
- ✅ Suggest improvements via issues

Please do not:
- ❌ Use for commercial purposes
- ❌ Claim as your own work
- ❌ Redistribute without attribution

---

## 🙏 Acknowledgments

- **Icons:** Emoji (Unicode standard)
- **Images:** Generated placeholder images
- **Fonts:** System font stack (no external requests)
- **Inspiration:** Modern educational platforms

---

## 📬 Contact

**Will Andrie Ilagan**  
Grade 11 - Bishop Alfredo Verzosa (BAV)

For questions or feedback about this educational project, please open an issue on GitHub.

---

## 🔄 Changelog

### v2.0.0 - 2026-01-29
- ✨ Added custom favicon (car SVG icon)
- 🎨 Enhanced animations (parallax, card tilt, ripple effects)
- 🐛 Fixed footer white border on mobile
- 📱 Improved hamburger menu visibility (blue background)
- ⚡ Slowed down menu animation (0.3s → 0.6s)
- 📝 Added comprehensive README documentation

### v1.0.0 - 2026-01-28
- 🎉 Initial release
- 📄 5 complete pages with content
- 🎨 Responsive design with mobile menu
- ♿ Accessibility features
- 📱 Mobile-first approach

---

<div align="center">
  <strong>Built with ❤️ for learners who want to understand their cars</strong>
  <br><br>
  <a href="https://carknow.vercel.app/">🌐 Visit Live Site</a>
  ·
  <a href="https://github.com/pipipew/car-knowledge-site/issues">🐛 Report Bug</a>
  ·
  <a href="https://github.com/pipipew/car-knowledge-site/issues">💡 Request Feature</a>
</div>

# 🖼️ Images Directory

This folder should contain **15 optimized images** for the Car Knowledge website.

## 📋 Required Images

### Homepage Images (5)
- `hero-car-garage.jpg` + `.webp` (1200x800, <200KB)
- `icon-engine.jpg` + `.webp` (400x400, <50KB)
- `icon-brakes.jpg` + `.webp` (400x400, <50KB)
- `icon-tires.jpg` + `.webp` (400x400, <50KB)
- `icon-battery.jpg` + `.webp` (400x400, <50KB)

### Content Images (10)
- `engine-bay-labeled.jpg` + `.webp` (1200x800, <150KB)
- `dashboard-overview.jpg` + `.webp` (1200x800, <150KB)
- `car-controls.jpg` + `.webp` (1200x800, <150KB)
- `car-types.jpg` + `.webp` (1200x800, <150KB)
- `brake-system.jpg` + `.webp` (1200x800, <150KB)
- `tire-tread.jpg` + `.webp` (1200x800, <150KB)
- `warning-lights-grid.jpg` + `.webp` (1200x800, <150KB)
- `oil-dipstick-check.jpg` + `.webp` (1200x800, <150KB)
- `tire-pressure-check.jpg` + `.webp` (1200x800, <150KB)
- `coolant-reservoir.jpg` + `.webp` (1200x800, <150KB)

---

## 🛠️ Optimization Guide

### Quick Optimization (Online)

1. **Go to [Squoosh.app](https://squoosh.app)**
2. **Drag your image**
3. **Set dimensions:**
   - Hero/Icons: as specified above
   - Content: 1200x800
4. **Export:**
   - MozJPEG quality 80
   - WebP quality 85
5. **Download both versions**
6. **Place in this folder**

### Batch Optimization (Command Line)

```bash
# Install tools
brew install imagemagick webp

# Optimize JPGs
for file in *.jpg; do
  convert "$file" -resize 1200x800^ -quality 80 "optimized-$file"
done

# Create WebP versions
for file in optimized-*.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

---

## ✅ Checklist

- [ ] All 15 JPG files added
- [ ] All 15 WebP versions created
- [ ] Total folder size < 1.8MB
- [ ] Each hero image < 200KB
- [ ] Each icon < 50KB
- [ ] Each content image < 150KB

---

## 📌 Where to Find Images

### Free Stock Photos
- [Unsplash](https://unsplash.com/s/photos/car-engine)
- [Pexels](https://pexels.com/search/car/)
- [Pixabay](https://pixabay.com/images/search/automobile/)

### Tips for Finding the Right Images
- Search: "car engine bay", "car dashboard", "brake system"
- Look for clear, well-lit images
- Avoid images with watermarks
- Choose educational/instructional style photos
- For labeled images, you may need to add labels yourself

---

## 💡 Need Help?

Check the main README.md for detailed optimization instructions and troubleshooting.

**Current Status:** ⚠️ Images needed - Add your images here to complete the site!
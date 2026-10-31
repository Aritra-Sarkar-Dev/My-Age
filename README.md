# Exact Age Calculator & Life Milestones 🎂✨

A modern, responsive, precision **Age Calculator** web application built with clean HTML5, CSS3, and Vanilla JavaScript. Features exact calendar arithmetic with leap-year handling, Western & Chinese Zodiac sign detection, 10,000-day life milestone tracking, smooth counting animations, Dark/Light mode, and AdMob/AdSense banner placement.

![Age Calculator Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Vanilla JS](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-blue)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-purple)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## 🌟 Key Features

1. **Exact Precision Age Calculation**
   - Calculates exact Years, Months, and Days lived.
   - Accurately accounts for month lengths, leap years (February 29th), and month rollover—no naive approximations (like dividing by 365).
   - Validates future dates and empty inputs gracefully.

2. **Smooth Count-Up Animations**
   - High-performance, staggered `requestAnimationFrame` cubic ease-out counting animation for age numbers when calculated.

3. **Western & Chinese Zodiac Signs**
   - Automatic detection of your **Western Zodiac sign** with astrological glyphs (♈ Aries, ♉ Taurus, etc.).
   - Automatic calculation of your **Chinese Zodiac animal** (Dragon 🐲, Tiger 🐯, Rabbit 🐰, etc.).

4. **Life Milestones Engine**
   - **10,000 Days Club**: Calculates the exact date when you will turn or turned 10,000 days old, complete with percentage progress bar.
   - **Milestone Birthday**: Shows days countdown to your next landmark birthday (18, 21, 25, 30, 40, 50, etc.).

5. **Monetization Ready (AdMob / Google AdSense)**
   - Pre-styled responsive ad container (`#admob-banner-container`) positioned below the calculator.
   - Easily drop in your Google AdSense or AdMob web tag script.

6. **Modern UI & UX**
   - Purple & deep indigo royal gradient theme with glowing ambient lighting orbs.
   - Clean glassmorphism calculator card with subtle shadows and micro-interactions.
   - **Dark Mode & Light Mode**: Seamless toggle with `localStorage` preference memory.
   - **One-Click Share & Copy**: Web Share API with instant clipboard fallback.
   - **Download InfinityFree Package**: One-click download button for Apache `.zip` package.

---

## 📁 Project Structure

```
├── index.html        # Main semantic HTML5 markup & responsive layout
├── style.css         # Modern CSS3 styles, CSS variables, animations, dark mode
├── script.js         # Pure Vanilla JavaScript engine (calendar math, zodiacs, milestones)
├── .htaccess         # Apache configuration (MIME types, Gzip compression, caching)
├── test/
│   └── age-calculator.test.mjs  # Comprehensive unit test suite (12 tests)
└── README.md         # Documentation
```

---

## 🚀 How to Host on GitHub Pages (Free in 30 Seconds!)

You can host this website directly on GitHub for free:

1. Create a new repository on GitHub (e.g. `age-calculator`).
2. Push this code to your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Click **Settings** (⚙️).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Branch**, select **`main`** and folder **`/(root)`**.
   - Click **Save**.
4. Within 1 minute, your site will be live at:
   `https://<your-username>.github.io/<your-repo-name>/` 🎉

---

## 🌐 Deploy to Netlify / Vercel / InfinityFree

- **Netlify**: Drag and drop this folder directly at [app.netlify.com/drop](https://app.netlify.com/drop).
- **InfinityFree / cPanel**: Upload `index.html`, `style.css`, `script.js`, and `.htaccess` into the `htdocs/` folder via FTP or File Manager.

---

## 🧪 Testing

Run the included automated test suite with Node.js:

```bash
node --test test/age-calculator.test.mjs
```

Covers:
- Standard birth dates
- Leap year leap day calculations (Feb 29)
- End-of-month clamping (Jan 31 to Feb 28/29)
- Western Zodiac boundary tests
- Chinese Zodiac cycle calculations
- 10,000-day milestone and milestone birthday countdowns

---

## 📄 License

MIT License. Free to use, modify, and distribute.

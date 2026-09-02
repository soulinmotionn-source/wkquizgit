# WKQuiz — Non-Programmer Administrator & Customization Guide

Welcome to the **WKQuiz** platform administration guide! This document provides clear, step-by-step instructions for non-programmers to install, configure, customize, monetize, and maintain your quiz platform on **Google Blogger**.

---

## Table of Contents
1. [Installing WKQuiz on Google Blogger](#1-installing-wkquiz-on-google-blogger)
2. [Customizing Colors, Fonts & Visual Identity](#2-customizing-colors-fonts--visual-identity)
3. [Updating Logo, Brand Name & Favicon](#3-updating-logo-brand-name--favicon)
4. [Setting Up Social Media Links](#4-setting-up-social-media-links)
5. [Managing the Question Bank (Add, Edit, Remove)](#5-managing-the-question-bank-add-edit-remove)
6. [Adding & Managing Categories](#6-adding--managing-categories)
7. [Configuring Quiz Modes, Lengths & Timers](#7-configuring-quiz-modes-lengths--timers)
8. [Inserting Google AdSense Ads](#8-inserting-google-adsense-ads)
9. [Customizing Navigation & Footer Links](#9-customizing-navigation--footer-links)
10. [Creating High-Yield SEO Category Landing Pages](#10-creating-high-yield-seo-category-landing-pages)
11. [Publishing Regular Blog Posts & Guides](#11-publishing-regular-blog-posts--guides)
12. [Troubleshooting & Best Practices](#12-troubleshooting--best-practices)

---

## 1. Installing WKQuiz on Google Blogger

1. Log into your [Blogger Dashboard](https://www.blogger.com).
2. In the left-hand sidebar, click **Theme**.
3. Next to the orange **CUSTOMIZE** button, click the downward arrow (⋮ or ▼) and select **Restore** (or **Edit HTML**).
4. **Option A (Restore):** Click **Upload** and select `theme.xml` (or `dist/wkquiz-theme.xml`) from this project folder.
5. **Option B (Edit HTML):** Open `theme.xml` in Notepad, copy all text (`Ctrl+A`, `Ctrl+C`), paste it into the Blogger HTML editor (`Ctrl+V`), and click the **Save (Disk icon)** button in the top right.
6. **CRITICAL STEP FOR MOBILE (Disable Legacy Mobile Template):**
   - In **Theme**, click the arrow (⋮ or ▼) next to **Customize** → Click **Mobile settings**.
   - Select **Desktop** (or choose *"No, show desktop theme on mobile devices"*).
   - Click **Save**.
   *(This tells Blogger not to override your site with its 2010 legacy mobile template, allowing the full responsive WKQuiz mobile theme to display on all phones.)*


---

## 2. Customizing Colors, Fonts & Visual Identity

All visual styling is controlled by centralized **CSS Variables** located near the top of `theme.xml` inside `<b:skin>`.

### To Change Colors:
Open `theme.xml` (or Blogger → Theme → Edit HTML) and find the `:root` block:

```css
:root {
  /* Change your primary brand accent color (Default: Indigo) */
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #e0e7ff;
  
  /* Change your secondary accent color (Default: Cyan) */
  --secondary: #06b6d4;
  --secondary-hover: #0891b2;
  
  /* Background and card colors */
  --background: #f8fafc;
  --surface: #ffffff;
  --surface-2: #f1f5f9;
  
  /* Text and borders */
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  
  /* Corner Rounding */
  --radius: 12px;
}
```

### To Change Fonts:
Modify the `--font-family` property:
```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

---

## 3. Updating Logo, Brand Name & Favicon

In `theme.xml`, locate the `WKQUIZ_CONFIG` object inside the `<script>` tag:

```javascript
const WKQUIZ_CONFIG = {
  // Brand & Site Information
  siteName: "WKQuiz",
  tagline: "Play. Learn. Challenge Yourself.",
  logoText: "WKQuiz",
  logoImageUrl: "", // Set an image URL here e.g. "https://example.com/logo.png"
  faviconUrl: "",
  defaultShareImage: "https://example.com/share-card.jpg",
  contactEmail: "support@wkquiz.com",
  ...
```

- **Favicon:** Go to **Blogger → Settings → Favicon** and upload your 32x32 square icon.
- **Logo Text:** Change `logoText` to your desired brand title.

---

## 4. Setting Up Social Media Links

In `WKQUIZ_CONFIG`, update the `socialLinks` object with your official profiles:

```javascript
socialLinks: {
  tiktok: "https://www.tiktok.com/@yourhandle",
  instagram: "https://www.instagram.com/yourhandle",
  facebook: "https://www.facebook.com/yourhandle",
  youtube: "https://www.youtube.com/@yourhandle",
  twitter: "https://twitter.com/yourhandle"
}
```
These URLs automatically populate your social sharing links and footer icons.

---

## 5. Managing the Question Bank (Add, Edit, Remove)

All questions live inside the `WKQUIZ_QUESTIONS` array in `src/questions.js` (or in `theme.xml`).

### Question Data Schema
Every question follows this standard format:

```javascript
{
  id: "nurs_101",                     // Unique identifier (required)
  category: "nursing",                // Must match a Category ID (required)
  subcategory: "Fundamentals",        // Specific sub-topic
  difficulty: "medium",               // "easy" | "medium" | "hard"
  question: "What is the primary sign of ...?",  // Question text
  options: [                          // Exactly 4 answer choices
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  answer: 0,                          // 0-based index of correct answer (0=Option 1, 1=Option 2, 2=Option 3, 3=Option 4)
  explanation: "Clear educational explanation why Option 1 is correct.",
  tags: ["nursing", "clinical", "exam"]
}
```

### Adding a New Question:
1. Copy an existing question block.
2. Give it a **unique ID** (e.g. `"nclex_050"`).
3. Paste your question text, 4 choices, set `answer` (0 to 3), and write an explanation.
4. Save the file or run `npm run build` if editing in the `src/` folder.

### Editing a Question:
Search for the question's `id` or question text and update the fields directly.

### Removing a Question:
Delete the question object or change its `category` to `"draft"`.

---

## 6. Adding & Managing Categories

To add a new quiz category, open `src/config.js` (or the `WKQUIZ_CONFIG.categories` list in `theme.xml`):

```javascript
{
  id: "psychiatry",
  name: "Psychiatry & Mental Health",
  slug: "psychiatry",
  icon: "🧠",
  description: "DSM-5 diagnostic criteria, psychiatric nursing, and behavioral health.",
  color: "#9333ea"
}
```
The category will automatically appear in:
- Homepage Category Grid
- Instant Search Modal
- Filter menus

---

## 7. Configuring Quiz Modes, Lengths & Timers

Under `WKQUIZ_CONFIG.quiz`, you can adjust:

```javascript
quiz: {
  defaultLength: 10,                 // Questions per classic quiz
  availableLengths: [5, 10, 20, 50], // Supported lengths
  defaultMode: "classic",            // "quick" | "classic" | "challenge" | "exam" | "timed" | "daily" | "survival"
  timePerQuestionSeconds: 20,        // Countdown seconds per question for Timed Mode
  enableTimerByDefault: false,       // Set true to enforce timer on all quizzes
  enableExplanations: true,          // Show immediate feedback after answer
  enableAnswerShuffle: true,         // Shuffle A/B/C/D order every time
  enableQuestionShuffle: true,       // Shuffle question order
  preventSessionDuplicates: true,    // Never show repeat questions during a session
  passingScorePercentage: 70         // Threshold for passing
}
```

---

## 8. Inserting Google AdSense Ads

WKQuiz comes with dedicated, non-intrusive AdSense containers designed for high viewability and CLS prevention.

### Ad Slots Available:
1. **Top Banner Ad (`#top-ad`):**
   - In Blogger Dashboard → **Layout** → Click **Edit** on **Top Advertisement (HTML1)**.
   - Paste your AdSense Responsive Horizontal Display code.
2. **Before Quiz Ad (`#wk-before-quiz-ad`):**
   - Insert your in-feed or responsive ad unit inside `<div id='wk-before-quiz-ad'>`.
3. **Sidebar Ad (`#sidebar-ad`):**
   - In Blogger Dashboard → **Layout** → Click **Edit** on **Sidebar Advertisement (HTML2)**.
   - Paste your AdSense 300x250 or 300x600 Display code.
4. **Results Screen Ad:**
   - AdSense code can be placed inside `.wk-share-section` for post-quiz impressions.

> **Tip:** Do not modify the container classes (`wk-ad-slot`) so that dark mode and responsive styling are preserved.

---

## 9. Customizing Navigation & Footer Links

### Modifying the Top Menu:
Search for `<nav class='wk-nav-desktop'>` in `theme.xml` and update the links:
```html
<a class='wk-nav-link' href='/p/about.html'>About</a>
<a class='wk-nav-link' href='/p/contact.html'>Contact</a>
```

### Modifying the Footer:
Search for `<footer class='wk-footer'>` and update your column links and copyright text.

---

## 10. Creating High-Yield SEO Category Landing Pages

To maximize organic search traffic from Google, create dedicated Blogger Pages for your top categories:

1. Go to **Blogger → Pages → New Page**.
2. Title: `NCLEX Practice Quizzes & Exam Prep | WKQuiz`
3. Permalink: `nclex-quizzes`
4. Page Body: Write an educational overview of NCLEX questions, study tips, and add this launch button:
   ```html
   <button type="button" class="wk-btn wk-btn-primary" data-action="start-category" data-category="nclex">
     🎯 Start NCLEX Quiz Now
   </button>
   ```
5. Click **Publish**. Visitors clicking this link will immediately get an interactive NCLEX quiz with rich SEO content surrounding it!

---

## 11. Publishing Regular Blog Posts & Guides

WKQuiz fully supports Blogger's standard CMS:
- Go to **Blogger → Posts → New Post**.
- Write articles, study guides, or answer breakdowns.
- Tag posts with Labels (e.g. `Nursing`, `HVAC`, `Electrical`).
- They will appear in the main feed below the quiz widget and in the sidebar topics widget.

---

## 12. Troubleshooting & Best Practices

- **Questions not showing?** Ensure every question object has all required fields (`id`, `category`, `question`, `options`, `answer`, `explanation`).
- **Dark Mode flashing?** The theme includes an inline `<head>` script that checks `localStorage` before render to ensure zero-flash mode switching.
- **Want to test locally without uploading?** Double-click `dist/index.html` to open the full interactive preview in Chrome, Firefox, Safari, or Edge!

---
*WKQuiz Platform — Built for Speed, Engagement, and Scalability.*

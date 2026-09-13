# WKQuiz — Cloudflare Pages Deployment Guide

This guide provides step-by-step instructions for deploying **WKQuiz** to **Cloudflare Pages**.

The build pipeline now automatically bundles everything needed into the `dist/` directory, including:
- `dist/index.html` (Standalone, responsive SPA quiz application)
- `dist/question-bank/` (All 5,000 verified questions across all 29 categories)
- `dist/_headers` (Cloudflare edge security & question-bank caching headers)
- `dist/_redirects` (Single-Page Application client routing)

---

## Method 1: Connect GitHub to Cloudflare Pages (Recommended — Automatic Deployments)

With this method, every time you run `git push`, Cloudflare will automatically build and deploy the updated site in seconds.

### Step 1: Push your latest changes to GitHub
In your terminal, run:
```bash
git add .
git commit -m "Configure Cloudflare Pages build and bundle 5000 question bank"
git push origin master
```

### Step 2: Open Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in.
2. In the left sidebar, click **Compute (Workers & Pages)** (or **Workers & Pages**).
3. Click the **Create application** button.
4. Select the **Pages** tab.
5. Click **Connect to Git**.

### Step 3: Select Your Repository
1. Select your GitHub account (`soulinmotionn-source`).
2. Choose the repository: **`wkquizgit`**.
3. Click **Begin setup**.

### Step 4: Configure Build Settings
Fill in the project details:
- **Project name**: `wkquiz` (or whatever you prefer, e.g. `wk-quiz`)
- **Production branch**: `master`
- **Framework preset**: `None`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### Step 5: Save and Deploy
1. Click **Save and Deploy**.
2. Cloudflare will clone your repository, run `npm run build`, and publish the `dist` folder to Cloudflare's global edge network.
3. You will receive a live URL, such as:
   ```
   https://wkquiz.pages.dev
   ```

---

## Method 2: Direct Upload (Drag & Drop — Instant 10-Second Deploy)

If you don't want to connect GitHub to Cloudflare:

1. Build the production bundle locally:
   ```bash
   npm run build
   ```
2. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages**.
3. Select **Direct Upload** (Upload assets).
4. Enter a project name (e.g. `wkquiz`).
5. Drag and drop the **`dist`** folder (located at `d:\projects\wk quiz\dist`) into the upload box.
6. Click **Deploy site**.
7. Your site is immediately live at `https://wkquiz.pages.dev`!

---

## Custom Domain Setup (Optional)

To connect your custom domain (e.g. `quiz.wkquiz.com` or `wkquiz.com`):
1. In your Cloudflare Pages project, go to the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain or subdomain.
4. If your domain's DNS is managed on Cloudflare, DNS records and SSL certificates are provisioned automatically.
5. If managed elsewhere, add the requested `CNAME` record pointing to `<project>.pages.dev`.

---

## Verifying Your Deployment

Once deployed on Cloudflare Pages:
1. Open your `*.pages.dev` URL on desktop or mobile.
2. Verify the homepage loads instantly with 0ms server lag.
3. Choose a category (e.g. **NCLEX**, **Automotive**, **Science**) and click **Start Quiz**.
4. Open browser Developer Tools (F12) → **Network** tab: you will observe questions loading directly from `/question-bank/<category>.json` served from Cloudflare's edge cache (`cf-cache-status: HIT`).

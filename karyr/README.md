# Karyr — Career Platform

A clean, modern Next.js career platform (like Handshake), ready to deploy on Vercel.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel

## Folder Structure

```
karyr/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind
│   ├── not-found.tsx       # 404 page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── signup/
│   │   └── page.tsx        # Signup page
│   └── dashboard/
│       └── page.tsx        # Dashboard page
├── components/
│   ├── Navbar.tsx          # Sticky responsive navbar
│   ├── Footer.tsx          # Site footer
│   ├── Button.tsx          # Reusable button (variants + sizes)
│   ├── JobCard.tsx         # Job listing card
│   └── StatCard.tsx        # Stats display card
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── public/                 # Static assets
├── .env.example            # Environment variable template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel (Step-by-Step)

### Option A — Deploy via Vercel CLI (recommended)

**Step 1**: Install the Vercel CLI globally
```bash
npm install -g vercel
```

**Step 2**: Log in to Vercel
```bash
vercel login
```

**Step 3**: Deploy from your project folder
```bash
cd karyr
vercel
```

Follow the prompts:
- Set up and deploy? → `Y`
- Which scope? → Select your account
- Link to existing project? → `N` (first time)
- Project name → `karyr`
- Directory? → `./` (default)

**Step 4**: Deploy to production
```bash
vercel --prod
```

Your site is live! Vercel gives you a URL like `https://karyr.vercel.app`.

---

### Option B — Deploy via GitHub (easiest for teams)

**Step 1**: Push your code to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Karyr MVP"
git remote add origin https://github.com/YOUR_USERNAME/karyr.git
git push -u origin main
```

**Step 2**: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no config needed
5. Click **"Deploy"**

**Step 3**: Add environment variables (if any)
- In Vercel dashboard → Project → **Settings → Environment Variables**
- Add your `.env.local` variables here

Every `git push` to `main` will auto-deploy. 🚀

---

## Customisation Guide

### Change brand colors
Edit `tailwind.config.js` → `theme.extend.colors.brand`

### Add authentication
Install [NextAuth.js](https://next-auth.js.org/):
```bash
npm install next-auth
```

### Add a database
Recommended options:
- **Supabase** (Postgres + Auth + Storage, free tier)
- **PlanetScale** (MySQL, serverless)
- **MongoDB Atlas** (NoSQL, free tier)

### Add real job data
Connect to a jobs API in `app/page.tsx`:
- [Adzuna API](https://developer.adzuna.com/)
- [The Muse API](https://www.themuse.com/developers/api/v2)
- Or build your own with Supabase

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

Built with ❤️ for Karyr.

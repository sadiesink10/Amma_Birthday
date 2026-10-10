# For You, Amma ❤️

A personal birthday website made with love — a Polaroid memory journey from a son and daughter to their mother, Swapna Priya.

## ✨ What It Is

A two-page, mobile-first birthday gift website featuring:

- **Page 1 — Polaroid Memory Journey** (`/`): Five family photographs displayed as Polaroid frames with personal handwritten messages, scroll-driven animations, and floating hearts.
- **Page 2 — Birthday Reveal** (`/birthday`): An animated "Happy Birthday Amma" heading, confetti celebration, a personal video message, creator credit, and a heartfelt closing.

## 🛠 Technology Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 6 | Build tool & dev server |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Scroll & entrance animations |
| React Router 6 | Client-side routing |
| Lucide React | Icons |

## 📁 Project Structure

```
f:\amma\
├── public/
│   ├── images/          # pic1–pic5.jpeg
│   └── videos/          # wish.mp4
├── src/
│   ├── components/      # Polaroid, MemorySection, FloatingHearts, etc.
│   ├── pages/           # MemoriesPage, BirthdayPage
│   ├── data/            # memories.ts, birthdayContent.ts
│   ├── styles/          # index.css (Tailwind + custom styles)
│   ├── App.tsx          # Router setup
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json          # SPA rewrite rules
└── .gitignore
```

## 🚀 Run Locally (Windows PowerShell)

```powershell
# Navigate to the project
cd F:\amma

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## 📸 Replace a Photograph

1. Place your new image in `public/images/`.
2. Name it `pic1.jpeg`, `pic2.jpeg`, etc. (matching the one you want to replace).
3. The image will update automatically during development.

## 🎥 Replace the Video

1. Place your new `.mp4` file in `public/videos/`.
2. Name it `wish.mp4` (overwriting the existing one).

## ✏️ Edit the Five Messages

Open `src/data/memories.ts`. Each memory object has:

- `caption` — the heading text
- `message` — the full personal message

Edit the text and save. Changes appear instantly in dev mode.

## 📦 Build for Production

```powershell
npm run build
```

Output is written to the `dist/` folder.

## 🐙 Push to GitHub

```powershell
git add .
git commit -m "Update birthday website"
git push origin main
```

**Note:** The video file (`wish.mp4`, ~1.2 GB) exceeds GitHub's 100 MB file-size limit. You will need [Git LFS](https://git-lfs.github.com/) to track it:

```powershell
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git add .
git commit -m "Track video with LFS"
git push origin main
```

## 🌐 Deploy to Vercel

### Option A: Import from GitHub
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. Vercel auto-detects Vite. Click **Deploy**.
4. The `vercel.json` handles SPA routing for `/birthday`.

### Option B: Vercel CLI
```powershell
npx -y vercel
```

**Important:** If `wish.mp4` is too large for Vercel's free tier (usually 100 MB per file), consider hosting the video on a CDN or compressing it before deployment.

## ❤️ Credits

Made by GLADY (Cyber security student, ex memer) the ENGINEER

*Nippu lanti Nirudhogi*

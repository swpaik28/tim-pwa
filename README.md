# Trust In Minutes

A student self-regulation tool — invest study time, earn rewards fairly.

Trust In Minutes is a Progressive Web App (PWA). Students can add it to their phone's home screen and use it like a native app — no app store required.

---

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
```

Production files are generated in the `dist/` folder.

---

## Deploy with Vercel

1. Push this folder to a GitHub repository.
2. Log in to [vercel.com](https://vercel.com) with your GitHub account.
3. Click **Add New → Project** and select this repository.
4. Vercel auto-detects **Vite**. Just click **Deploy**.
5. After 1-2 minutes you'll get a URL like `https://[project].vercel.app`.

---

## Add to your phone's home screen

**iPhone (Safari):** Share button -> "Add to Home Screen"
**Android (Chrome):** Menu (⋮) -> "Add to Home Screen"

---

## Data storage

- User data is saved in the device's browser (localStorage).
- It persists across refreshes on the same device and browser.
- Clearing browser cache or switching devices will erase the data.
- Use the "Reset All Data" button in Settings to clear everything.

> This is a pilot-test version. Multi-user data aggregation, cloud backup,
> and remote parent/teacher access would require a future Firebase integration.

---

## About

Trust In Minutes treats time as each student's most personal and limited asset.
Study effort unlocks earned reward time, helping students allocate their time
deliberately, motivate themselves through earned rewards, and build
self-regulation through self-set rules.

Developed by Andrew Paik.

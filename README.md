# Saw Wei Chin — Spatial Systems Portfolio

An interactive software engineering portfolio built with React, TypeScript, Three.js, React Three Fiber, Vite, and Tailwind CSS.

## Run locally in VS Code

1. Install Node.js 22 or newer.
2. Open this folder in VS Code.
3. Open the integrated terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local address shown in the terminal.

## Production build

```bash
npm run build
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site whenever the `main` branch is updated. In the GitHub repository, choose **Settings → Pages → Source → GitHub Actions** once to enable the deployment.

## Main content

- `src/App.tsx` — portfolio content and interface
- `src/components/SystemScene.tsx` — interactive 3D system architecture
- `src/index.css` — visual system, responsive styling, and motion
- `public/profile-photo.jpeg` — profile photo
- `public/resume.pdf` — downloadable résumé

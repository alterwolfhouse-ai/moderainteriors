# Modera Interiors

Vite React website for Modera Interiors, configured for deployment to GitHub Pages with the custom domain `moderainteriors.in`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The built site is emitted to `dist/`.

## GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. On every push to `main`, GitHub installs dependencies, builds the Vite app, and deploys `Responsive Website UI Design/dist` to GitHub Pages.

The custom domain is set through `public/CNAME`, which is copied to `dist/CNAME` during the build.

For `moderainteriors.in`, configure DNS with your domain provider:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   <your-github-username-or-org>.github.io
```

After deployment, open the repository's Settings > Pages, set the source to GitHub Actions, verify the custom domain, and enable Enforce HTTPS when GitHub makes it available.

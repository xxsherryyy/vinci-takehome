# GitHub Pages Deployment Guide

This guide will help you deploy your Vinci Takehome React application to GitHub Pages.

## Prerequisites

1. A GitHub repository (this project)
2. GitHub account with Pages enabled

## Setup Steps

### 1. Install Dependencies

First, install the new dependency for GitHub Pages deployment:

```bash
npm install
```

### 2. Configure GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. Deploy Methods

#### Method A: Automatic Deployment (Recommended)

The GitHub Actions workflow will automatically deploy when you push to the `main` branch:

1. Push your code to the main branch:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. Go to the **Actions** tab in your GitHub repository
3. Watch the deployment workflow run
4. Once complete, your site will be available at: `https://yourusername.github.io/vinci-takehome/`

#### Method B: Manual Deployment

You can also deploy manually using the npm script:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages using the `gh-pages` package

### 4. Verify Deployment

1. Check the **Actions** tab for successful deployment
2. Visit your GitHub Pages URL: `https://yourusername.github.io/vinci-takehome/`
3. Test the 3D scene and interactions

## Configuration Details

### Vite Configuration
- **Base Path**: Set to `/vinci-takehome/` for production builds
- **Build Output**: Configured to output to `dist` folder
- **Source Maps**: Disabled for production

### GitHub Actions Workflow
- **Triggers**: Runs on push to `main` branch
- **Node Version**: Uses Node.js 18
- **Deployment**: Uses `peaceiris/actions-gh-pages` action
- **Publish Directory**: `./dist`

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure GitHub Pages is enabled and the base path is correct
2. **Build Fails**: Check the Actions tab for error details
3. **Assets Not Loading**: Verify the base path in `vite.config.ts`

### Updating the Repository Name

If you change your repository name, update:
1. The `base` path in `vite.config.ts`
2. The repository name in this README

## Local Development

For local development, the base path is set to `/` so everything works normally:

```bash
npm run dev
```

## Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built files locally with the correct base path.

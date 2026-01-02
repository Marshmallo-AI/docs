# Marlo Documentation

This is a documentation site built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site).

## Getting Started

### Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages by modifying files in `src/app/`. The page auto-updates as you edit the file.

### Building for Production

This project uses static export for production builds:

```bash
npm run build
```

This will:

1. Build the Next.js application and export static files to the `out/` directory
2. Generate the Pagefind search index in `out/_pagefind/` (via postbuild script)

The static files in `out/` can be served by any static hosting service.

### Project Structure

- `src/app/` - Application pages and routes
  - `page.mdx` - Home page
  - `agent-systems/` - Agent system documentation
  - `features/` - Feature documentation
  - `sdk/` - SDK documentation
- `public/` - Static assets (images, etc.)
- `next.config.ts` - Next.js and Nextra configuration
- `out/` - Static export output (generated during build)

## Features

- **Static Export**: Configured for static site generation
- **Search**: Powered by Pagefind for full-text search
- **MDX Support**: Write documentation in MDX format
- **Nextra Theme**: Uses Nextra theme for documentation

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Nextra Documentation](https://nextra.site) - learn about Nextra features
- [Pagefind Documentation](https://pagefind.app) - learn about Pagefind search

## Deploy

The easiest way to deploy this static site is to use [Vercel](https://vercel.com) or any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `out/` directory to your hosting service

For Vercel, you can connect your repository and it will automatically build and deploy.

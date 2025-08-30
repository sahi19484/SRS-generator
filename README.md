# SRS Document Generator

A modern, production-ready web app to create professional Software Requirement Specification (SRS) documents. It guides you through all standard SRS sections (Introduction, General Description, Functional/Non‑Functional Requirements, Constraints, Performance, Interfaces, Schedule & Budget, Appendices) and exports a complete document.

## Features
- Full SRS section coverage following industry conventions
- Clean, responsive UI with live completion indicators
- Client-side navigation (React Router)
- Export SRS as a text document you can open in Microsoft Word and save as .docx
- Type-safe codebase (TypeScript) with modern tooling (Vite, TailwindCSS)

## Tech Stack
- React 18 + TypeScript + Vite
- React Router 6 (SPA)
- TailwindCSS 3 (utility-first styling)
- Radix UI (accessible components)
- Express (API-ready server integration)

## Getting Started
Prerequisites:
- Node.js 18+

Install dependencies:

```bash
npm install
```

Run locally (dev server with hot reload):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production build:

```bash
npm start
```

## Usage
1. Open the app and fill out the Header fields (Title, Authors, Affiliation, Address, Date, Version).
2. Complete each SRS section using the tabbed interface: Introduction, Requirements, and Details.
3. Use the Progress panel to ensure every section is complete.
4. Click “Export Document” to download a complete SRS as a .txt file.
   - Open the file in Microsoft Word and “Save As” .docx for a Word document format.

## Project Structure
```
client/                   # React SPA frontend
  pages/                  # Route components (Index.tsx = home)
  components/ui/          # UI component library
  App.tsx                 # App entry point and routing
  global.css              # Tailwind theme and globals
server/                   # Express API backend
  index.ts                # Express + Vite integration
  routes/                 # API handlers
shared/                   # Shared types between client and server
```

## Configuration
- Tailwind theme tokens are defined in HSL format in client/global.css and mapped in tailwind.config.ts.
- API routes are namespaced under /api if/when you add server endpoints.

## Testing
```bash
npm test
```

## Deployment
Recommended: Netlify.
- For best experience in Builder, connect the Netlify MCP by clicking the “MCP Servers” button and deploy directly.
- Alternatively, push the repo to your Git provider and set up Netlify to run:
  - Build command: `npm run build`
  - Publish directory: `dist/spa`

Tip: You can also share a preview from the running dev server via “Open Preview,” but it’s not a production URL.

## Roadmap
- Native .docx export (using a DOCX generator)
- PDF export
- Section templates and validation checklists
- Multi-document management and version history

## Support
- Builder.io project docs: https://www.builder.io/c/docs/projects
- For deployment, consider Netlify MCP integration.

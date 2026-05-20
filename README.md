# Dynamic Product Manager Portfolio & Website Builder

An award-winning, heavily-animated personal website built with **React 19**, **Vite**, **TypeScript**, and **Framer Motion**. 

The architecture features a local, flat-file content writing system and AI agent workspace that allows you (or your AI agent assistants) to write content, adjust section arrangements, and compile visual panels dynamically.

## 🚀 Quick Start (Local Development)

To start the development server locally on your Mac:

```bash
# 1. Install dependencies
npm install

# 2. Run the compiler & start local development
npm run dev
```

*Note: running `npm run dev` automatically triggers `predev`, compiling your local raw content and running schema audits before launching the Vite dev server.*

---

## 🛠️ Build and Deploy

To build the static production bundle and publish it directly to your GitHub Pages domain:

```bash
# Deploy to GitHub Pages (https://JakirHassan.github.io/portfolio/)
./deploy.sh
```

---

## 📂 Project Architecture

```
├── /content/                       <-- Local Content System (Ignored by Git)
│   ├── /profile/about.json         <-- Bio and social links
│   ├── /profile/layout.json        <-- Layout section order and headers config
│   ├── /resume/work-history.json   <-- Career timeline database
│   ├── /case-studies/              <-- Project case studies (.md with YAML frontmatter)
│   └── /articles/                  <-- Deep dives & publications (.md with frontmatter)
│
├── /agents/                        <-- Multi-Agent Instructions (Ignored by Git)
│   ├── /prompts/                   <-- Instruction sheets for Orchestrator, Writer, Designer, Reviewer
│   └── /scripts/                   <-- Aggregation compiler & schema auditor scripts
│
├── /src/                           <-- Website Source Code (Tracked by Git)
│   ├── /components/ui/             <-- Reusable design system primitives (Button, Card, Badge)
│   ├── /components/builder/        <-- Dynamic page layout compilers
│   ├── /core/contentLoader.ts      <-- Content TypeScript interfaces and getters
│   ├── /data/compiledContent.json  <-- Compiled JSON database (Imported by client)
│   └── App.tsx                     <-- Core entry point (scroll monitoring & layout rendering)
│
├── deploy.sh                       <-- Automated code-push and deploy script
└── package.json                    <-- Task targets, scripts, and dependencies
```

---

## ⚙️ How Content Compilation Works

To ensure fast page load speeds and keep bundle sizes small, markdown parsing and frontmatter extraction happen at **build-time** instead of runtime:

1. **`content-compiler.js`** reads files from `/content/`, processes frontmatter, and aggregates everything into the static JSON database: [compiledContent.json](file:///Users/jakirhassan/Gemini%20Workspace/personal/src/data/compiledContent.json).
2. **`lint-check.js`** audits the compiled JSON database to ensure all fields align with the TS schema.
3. The React app imports this JSON database directly, keeping the production build clean of heavy markdown parsers.

### Running Compilation Manually:
```bash
# Run compilation manually
node agents/scripts/content-compiler.js

# Run schema validation manually
node agents/scripts/lint-check.js
```

---

## 🔒 Git Tracking and Privacy

The `/agents` and `/content` folders are configured in [`.gitignore`](file:///Users/jakirhassan/Gemini%20Workspace/personal/.gitignore) to remain **local-only** on your Mac. 

This ensures that:
- Your raw AI agent prompt templates and markdown drafts are not exposed publicly in your GitHub repository.
- The Git tree tracks only the clean frontend source code.
- The production site is still fully functional on GitHub Pages, as it deploys from the compiled [compiledContent.json](file:///Users/jakirhassan/Gemini%20Workspace/personal/src/data/compiledContent.json) database which *is* tracked in the Git repository.

#!/bin/bash

# Clear invalid env token if present
export GITHUB_TOKEN=""

echo "=== Step 1: Creating GitHub Repository ==="
# Check if repo already exists, if not, create it
if gh repo view JakirHassan/portfolio >/dev/null 2>&1; then
  echo "Repository 'portfolio' already exists on GitHub. Linking remote origin..."
  git remote remove origin 2>/dev/null
  git remote add origin https://github.com/JakirHassan/portfolio.git
else
  echo "Creating new public repository 'portfolio' on GitHub..."
  gh repo create portfolio --public --source=. --remote=origin
fi

echo "=== Step 2: Pushing code to main ==="
git branch -M main
git push -u origin main --force

echo "=== Step 3: Deploying to GitHub Pages ==="
npm run deploy

echo "=== Done! ==="
echo "Your portfolio will be live at: https://JakirHassan.github.io/portfolio/"

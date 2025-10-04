#!/bin/bash

# Fix Dependencies Script for BYOUT Website
echo "🔧 Fixing dependencies..."

# Stop any running dev server
echo "📦 Cleaning up..."
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
echo "🗑️ Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "📥 Reinstalling dependencies..."
npm install

# Success message
echo "✅ Dependencies fixed!"
echo ""
echo "You can now run:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview production build"



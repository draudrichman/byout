@echo off
REM Fix Dependencies Script for BYOUT Website (Windows)
echo 🔧 Fixing dependencies...

REM Stop any running dev server
echo 📦 Cleaning up...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f package-lock.json

REM Clear npm cache
echo 🗑️ Clearing npm cache...
call npm cache clean --force

REM Reinstall dependencies
echo 📥 Reinstalling dependencies...
call npm install

REM Success message
echo ✅ Dependencies fixed!
echo.
echo You can now run:
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm run preview - Preview production build



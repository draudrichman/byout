# 🔧 Troubleshooting Guide

## Issue: Module Import Error

### Error Message:
```
The requested module '/node_modules/react-reconciler/constants.js' does not provide an export named 'ConcurrentRoot'
```

### Solution:
This error is caused by a dependency version mismatch. Here's how to fix it:

#### Option 1: Clear Cache and Reinstall (Recommended)
```bash
# Stop the dev server (Ctrl+C)

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

#### Option 2: Update Dependencies
```bash
npm update @react-three/fiber @react-three/drei @react-three/postprocessing
npm install
```

#### Option 3: Temporary Fix (If above doesn't work)
If the error persists, temporarily disable lazy loading:

In `src/App.jsx`, change from:
```jsx
const StatsPage = lazy(() => import('./components/StatsPage'))
```

To regular imports:
```jsx
import StatsPage from './components/StatsPage'
```

---

## Issue: Slow Frame Warnings

### What it means:
The performance monitor is detecting frames that take longer than 16.67ms (60fps threshold).

### This is NORMAL when:
- ✅ Page is loading
- ✅ Components are mounting
- ✅ Heavy animations are starting
- ✅ WebGL is initializing

### When to worry:
- ❌ During normal scrolling
- ❌ After page has fully loaded
- ❌ Consistently showing slow frames

### Solution:
The new code only logs frames over 50ms, which reduces noise. If you still see warnings:

1. **Check Chrome DevTools Performance Tab**
   - Record a session
   - Look for long tasks
   - Identify the bottleneck

2. **Disable Performance Monitoring**
   In `src/App.jsx`, comment out the useEffect:
   ```jsx
   // Performance monitoring (optional - disable if too noisy)
   // useEffect(() => { ... }, [])
   ```

---

## Issue: Website Still Feels Slow

### Quick Checks:

1. **Are you in Development Mode?**
   - Dev mode is slower due to hot reload, sourcemaps, etc.
   - Always test performance with production build:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check Browser Extensions**
   - Disable ad blockers, React DevTools, etc.
   - Test in Incognito mode

3. **Clear Browser Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

4. **Check Hardware Acceleration**
   - Chrome → Settings → System → Use hardware acceleration

---

## Issue: High Memory Usage

### Solutions:

1. **Check for Memory Leaks**
   ```jsx
   // Make sure all useEffect have cleanup
   useEffect(() => {
     const handler = () => { /* ... */ };
     window.addEventListener('scroll', handler);
     
     // IMPORTANT: Cleanup
     return () => window.removeEventListener('scroll', handler);
   }, []);
   ```

2. **Monitor with DevTools**
   - Chrome DevTools → Memory Tab
   - Take heap snapshot
   - Look for retained objects

3. **Reduce WebGL Complexity**
   - In `PrismaBackground.jsx`, reduce steps further:
   ```jsx
   const STEPS = 30; // Instead of 50
   ```

---

## Issue: Images Not Loading

### Solutions:

1. **Check Image Paths**
   - Images should be in `/public` folder
   - Use relative paths: `./img/logo.svg`

2. **Lazy Loading Issues**
   - Add `loading="lazy"` to images
   - Use proper fallbacks

---

## Common Performance Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install
```

---

## Performance Debugging Checklist

- [ ] Test in production build (`npm run build`)
- [ ] Test in Incognito mode (no extensions)
- [ ] Clear browser cache
- [ ] Check Chrome DevTools Performance tab
- [ ] Check Chrome DevTools Memory tab
- [ ] Disable performance monitoring if too noisy
- [ ] Check network tab for large assets
- [ ] Verify WebGL is using GPU (not software rendering)
- [ ] Test on different browsers
- [ ] Test on different devices

---

## Getting Help

If issues persist:

1. **Check Console Errors**
   - Open DevTools Console
   - Look for red errors
   - Share error messages

2. **Run Lighthouse Audit**
   - Chrome DevTools → Lighthouse
   - Run audit
   - Check recommendations

3. **Profile with React DevTools**
   - Install React DevTools extension
   - Use Profiler tab
   - Record and analyze

---

## Known Limitations

### Development Mode:
- Slower due to hot reload
- More memory usage
- Extra logging
- NOT representative of production performance

### Solution: Always test performance with:
```bash
npm run build
npm run preview
```

---

## Quick Fixes

### If website won't start:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

### If images won't load:
- Check they're in `/public` folder
- Use `./img/` paths, not `/img/`
- Hard refresh: `Ctrl+Shift+R`

### If animations are choppy:
- Check GPU acceleration is enabled
- Test in production build
- Reduce animation complexity

---

**Remember:** Most "slow frame" warnings during initial load are normal. Focus on performance AFTER the page is fully loaded.



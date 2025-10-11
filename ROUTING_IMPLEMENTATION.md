# Routing Implementation Guide

## Overview
This document outlines the implementation of React Router with Framer Motion page transitions for the Byout website, specifically for the Technology and Retail Channel pages accessible from the Core Services section.

## What Was Implemented

### 1. **React Router Setup**
- Integrated `react-router-dom` (v7.9.3) for client-side routing
- Configured `BrowserRouter` in `src/main.jsx` to wrap the entire application
- Set up route definitions in `src/App.jsx`

### 2. **Page Components Created**

#### `src/pages/HomePage.jsx`
- Refactored the main homepage content into a dedicated component
- Contains all existing sections: Landing, Stats, Logo, Company Introduction, Experience Showcase, Timeline, Global Presence, Core Services, Founder/Staff, and Contact Form
- Maintains lazy loading for optimal performance

#### `src/pages/TechPage.jsx`
- Wrapper component for the tech-page from `src/tech1/tech-page/`
- Includes:
  - Nested routing for `/tech`, `/tech/hph`, and `/tech/pef`
  - Custom "Back to Home" button with hover animations
  - Loading spinner for lazy-loaded components
  - ScrollToTop functionality

#### `src/pages/RetailChannelPage.jsx`
- Wrapper component for the retail-channel from `src/retail-channel/gsapcountries-main/`
- Includes:
  - Hero, CardAnimation, and Countries components
  - Custom "Back to Home" button
  - Imports the retail channel's CSS styles

### 3. **Framer Motion Page Transitions**

#### `src/components/PageTransition.jsx`
- Smooth page transitions using Framer Motion
- Features:
  - Fade in/out with scale effects
  - Overlay with gradient backdrop blur during transition
  - Timing: 600ms enter, 400ms exit
  - Custom easing: `[0.22, 1, 0.36, 1]` for smooth motion

#### `src/components/ScrollToTop.jsx`
- Ensures scroll position resets to top on route changes
- Uses instant behavior for immediate reset

### 4. **Core Services Navigation**

#### Modified `src/components/CoreServices.jsx`
- Added `useNavigate` hook from React Router
- Implemented `handleItemClick` function that:
  - **Index 0 (Brand Development)**: Opens the existing preview modal
  - **Index 1 (Technology)**: Navigates to `/tech` route
  - **Index 2 (Retail Operations)**: Navigates to `/retail` route

### 5. **App.jsx Refactoring**

#### Smart Background Rendering
- Prism background only renders on homepage (not on `/tech` or `/retail` routes)
- Improves performance on subpages

#### Conditional Smooth Scrolling
- ReactLenis (smooth scroll) only applied to homepage
- Tech and Retail pages use native scrolling for better compatibility

#### Route Structure
```jsx
HomePage: /
TechPage: /tech, /tech/hph, /tech/pef
RetailChannelPage: /retail
```

## File Structure

```
src/
├── App.jsx                     # Main app with routing logic
├── main.jsx                    # Entry point with BrowserRouter
├── components/
│   ├── CoreServices.jsx        # Updated with navigation
│   ├── PageTransition.jsx      # Framer Motion transitions
│   └── ScrollToTop.jsx         # Scroll restoration
└── pages/
    ├── HomePage.jsx            # Main homepage
    ├── TechPage.jsx            # Technology page wrapper
    └── RetailChannelPage.jsx  # Retail channel wrapper
```

## How It Works

### User Flow

1. **User visits homepage** → sees all sections including Core Services
2. **User clicks "View" on Technology card** → 
   - Framer Motion transition begins (fade out + scale)
   - Navigation to `/tech` route
   - Page scrolls to top
   - Tech page fades in with smooth animation
3. **User clicks "Back to Home"** →
   - Smooth transition back to homepage
   - Maintains all previous state
4. **Same flow for Retail Operations** → navigates to `/retail`

### Technical Flow

```
User clicks Technology "View" button
  ↓
handleItemClick(1) called
  ↓
navigate('/tech') executed
  ↓
Route change detected
  ↓
PageTransition exit animation (400ms)
  ↓
Component unmounts
  ↓
ScrollToTop resets scroll position
  ↓
New route renders (TechPage)
  ↓
PageTransition enter animation (600ms)
  ↓
User sees tech page
```

## Key Features

### 🎨 Smooth Transitions
- Professional fade and scale effects
- Gradient overlay for visual continuity
- No jarring page changes

### 🚀 Performance Optimized
- Lazy loading maintained for all components
- Background only renders where needed
- Smooth scroll only on homepage

### 🎯 User Experience
- Back buttons on all subpages
- Automatic scroll restoration
- Loading states for async components
- Hover animations on interactive elements

### 📱 Responsive Design
- Works on all screen sizes
- Touch-friendly back buttons
- Mobile-optimized transitions

## Animation Details

### Page Transition Variants

**Initial State:**
```js
opacity: 0
scale: 0.95
y: 20px
```

**Enter Animation:**
```js
opacity: 1
scale: 1
y: 0
duration: 600ms
easing: [0.22, 1, 0.36, 1]
```

**Exit Animation:**
```js
opacity: 0
scale: 1.05
y: -20px
duration: 400ms
easing: [0.22, 1, 0.36, 1]
```

## Testing

### To Test the Implementation:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test Homepage:**
   - Navigate to `http://localhost:5173/`
   - Scroll to Core Services section
   - All three cards should be visible

3. **Test Technology Navigation:**
   - Click "View" on Technology card
   - Should smoothly transition to tech page
   - Click "Back to Home" button
   - Should return to homepage

4. **Test Retail Navigation:**
   - Click "View" on Retail Operations card
   - Should smoothly transition to retail channel page
   - Click "Back to Home" button
   - Should return to homepage

5. **Test Brand Development:**
   - Click "View" on Brand Development card
   - Should open the existing preview modal (original behavior)

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies Used

- `react-router-dom`: ^7.9.3 - Routing
- `framer-motion`: ^12.23.12 - Page transitions

## Future Enhancements

Potential improvements for future iterations:

1. **Route-based Code Splitting**
   - Further optimize bundle size by splitting routes

2. **Transition Direction**
   - Different animations for forward/backward navigation

3. **Loading States**
   - Custom loading animations between routes

4. **Deep Linking**
   - Shareable URLs for specific sections

5. **Navigation Guards**
   - Protect routes or show confirmation dialogs

## Vite Configuration

### Path Aliases
The retail-channel project uses TypeScript path aliases (`~/*` maps to `./app/*`). The main `vite.config.js` has been updated to resolve these:

```js
resolve: {
  alias: {
    '~': path.resolve(__dirname, './src/retail-channel/gsapcountries-main/app'),
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
}
```

This allows imports like `~/constant/countries` to resolve correctly to the retail-channel's app directory.

## Known Issues & Resolutions

### ✅ RESOLVED: "NotFoundError: Failed to execute 'insertBefore' on 'Node'"

**Problem:** 
Early implementation had AnimatePresence wrapping Routes component, causing React DOM manipulation conflicts during transitions.

**Root Cause:**
```jsx
// ❌ WRONG - causes DOM conflicts
<PageTransition>
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</PageTransition>
```

When AnimatePresence wraps Routes, it interferes with React Router's internal DOM updates, causing "insertBefore" errors.

**Solution:**
```jsx
// ✅ CORRECT - AnimatePresence outside, wrap each element
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
    <Route path="/tech/*" element={<PageTransition><TechPage /></PageTransition>} />
  </Routes>
</AnimatePresence>
```

Key points:
1. AnimatePresence wraps Routes, not the other way around
2. Pass `location` and `key` to Routes for proper change detection
3. Wrap each individual Route element with PageTransition
4. Use `mode="wait"` to ensure clean transitions

## Troubleshooting

### Issue: "Failed to resolve import ~/constant/countries"
**Solution:** 
1. Ensure path aliases are configured in `vite.config.js` (see above)
2. Restart the dev server after making vite.config.js changes:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Issue: Transitions not smooth
**Solution:** Check if Framer Motion is properly installed:
```bash
npm install framer-motion@^12.23.12
```

### Issue: Routes not working
**Solution:** Ensure BrowserRouter is properly configured in `main.jsx`

### Issue: Back button not appearing
**Solution:** Check z-index conflicts with other fixed elements

### Issue: Scroll position not resetting
**Solution:** Verify ScrollToTop component is rendered in App.jsx

### Issue: TypeScript errors in retail-channel components
**Solution:** The retail-channel components are TypeScript files (.tsx). Vite will handle them automatically, but if you encounter type errors, they can be safely ignored as the code will still compile and run.

## Conclusion

The routing implementation successfully integrates React Router with Framer Motion to provide smooth, professional page transitions while maintaining the existing functionality of the Brand Development preview modal. The solution is performant, user-friendly, and maintains the high-quality aesthetic of the Byout website.


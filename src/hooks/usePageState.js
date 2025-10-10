import { useEffect } from 'react';

/**
 * Hook to preserve and restore complete page state
 */
export const usePageState = (location) => {
  useEffect(() => {
    // Save page state before navigating away
    const savePageState = () => {
      const state = {
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        timestamp: Date.now(),
        pathname: location.pathname,
        // Save body classes
        bodyClasses: Array.from(document.body.classList),
        // Save computed styles of key elements
        computedStyles: {},
      };

      // Save key element states
      const keyElements = document.querySelectorAll('[data-preserve-state]');
      keyElements.forEach((el, index) => {
        const computedStyle = window.getComputedStyle(el);
        state.computedStyles[index] = {
          transform: computedStyle.transform,
          opacity: computedStyle.opacity,
          display: computedStyle.display,
          position: computedStyle.position,
        };
      });

      sessionStorage.setItem('pageState', JSON.stringify(state));
    };

    // Restore page state when returning
    const restorePageState = () => {
      const savedState = sessionStorage.getItem('pageState');
      if (!savedState || location.pathname !== '/') return;

      try {
        const state = JSON.parse(savedState);
        
        // Restore body classes
        document.body.className = '';
        state.bodyClasses.forEach(className => {
          if (className !== 'tech-page-active') {
            document.body.classList.add(className);
          }
        });

        // Restore scroll position
        window.scrollTo(state.scrollX, state.scrollY);

        // Clear saved state
        sessionStorage.removeItem('pageState');
      } catch (error) {
        console.error('Error restoring page state:', error);
      }
    };

    // If navigating away from main page, save state
    if (location.pathname === '/') {
      window.addEventListener('beforeunload', savePageState);
    }

    // If returning to main page, restore state
    if (location.pathname === '/' && sessionStorage.getItem('pageState')) {
      setTimeout(restorePageState, 300);
    }

    return () => {
      window.removeEventListener('beforeunload', savePageState);
    };
  }, [location.pathname]);
};


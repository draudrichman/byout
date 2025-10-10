import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

/**
 * Hook to manage scroll position restoration and ScrollTrigger refresh
 */
export const useScrollPosition = (location) => {
  useEffect(() => {
    // Refresh ScrollTrigger with proper timing
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      
      // Force a second refresh to ensure all elements are properly positioned
      setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Restore scroll position if coming back from tech page
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition && location.pathname === '/') {
          const scrollY = parseInt(savedScrollPosition, 10);
          
          // Use smooth scroll to restore position
          window.scrollTo({
            top: scrollY,
            left: 0,
            behavior: 'instant'
          });
          
          sessionStorage.removeItem('scrollPosition');
          
          // Force Tailwind classes to reapply by triggering a reflow
          document.body.offsetHeight;
          
          // Kill all existing timelines to reset animations
          gsap.globalTimeline.clear();
          
          // Final refresh after scroll position is restored
          setTimeout(() => {
            ScrollTrigger.refresh(true); // Force refresh
            
            // Ensure all ScrollTrigger instances update
            ScrollTrigger.getAll().forEach(trigger => {
              trigger.refresh();
            });
          }, 100);
        }
      }, 100);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);
};


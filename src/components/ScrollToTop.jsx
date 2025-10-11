import { useEffect } from 'react';

function ScrollToTop() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Listen for history changes (back/forward)
    const handleHistoryChange = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };
    
    window.addEventListener('popstate', handleHistoryChange);
    
    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, []);

  return null;
}

export default ScrollToTop;



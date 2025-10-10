import { useEffect } from 'react';

/**
 * Hook to isolate styles and prevent CSS conflicts between pages
 */
export const useStyleIsolation = (isActive) => {
  useEffect(() => {
    if (!isActive) return;

    // Add a class to body to indicate tech page is active
    document.body.classList.add('tech-page-active');

    // Create a style element to isolate tech page styles
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-tech-page', 'true');
    styleElement.textContent = `
      /* Tech page style isolation */
      .tech-page-active {
        overflow-x: hidden;
      }
      
      /* Ensure tech page styles don't affect main app */
      .tech-page-active .page-transition-container {
        isolation: isolate;
      }
      
      /* Prevent tech page styles from leaking */
      .tech-page-active * {
        box-sizing: border-box;
      }
    `;
    
    document.head.appendChild(styleElement);

    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove('tech-page-active');
      const techPageStyles = document.querySelectorAll('style[data-tech-page]');
      techPageStyles.forEach(style => style.remove());
    };
  }, [isActive]);
};

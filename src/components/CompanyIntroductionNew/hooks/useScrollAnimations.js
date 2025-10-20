import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (containerRef) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = container.querySelectorAll('div:not(.philosophy-section):not(.philosophy-divider):not(.philosophy-container)');
    const headings = container.querySelectorAll('h3');

    gsap.set(sections, {
      opacity: 0
    });

    ScrollTrigger.batch(sections, {
      onEnter: (elements) => {
        elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            delay: index * 0.08
          });
        });
      },
      onLeave: (elements) => {
        elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            delay: index * 0.1
          });
        });
      },
      onEnterBack: (elements) => {
        elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            delay: index * 0.08
          });
        });
      },
      onLeaveBack: (elements) => {
        elements.forEach((element, index) => {
          gsap.to(element, {
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
            delay: index * 0.1
          });
        });
      },
      start: "top 85%",
      end: "bottom -10%"
    });

    headings.forEach((h, index) => {
      gsap.to(h, {
        filter: "hue-rotate(30deg)",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 1.2,
      });
    });

    return () => {
      // Cleanup function
    };
  }, { scope: containerRef });
};

export const usePhilosophyRectAnimation = () => {
  return {
    animateRect: (rect, delay = 0) => {
      const tl = gsap.timeline({ delay });
      tl.fromTo(rect, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center",
      }, {
        opacity: 0.3,
        scale: 1,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(rect, {
        opacity: 0,
        scale: 1.1,
        duration: 0.2,
        ease: "power2.in",
      });
    },
    
    resetRect: (rect) => {
      gsap.set(rect, {
        opacity: 0,
        scale: 0,
      });
    }
  };
};

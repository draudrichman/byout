import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './css/CoverPageTransition.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

// Images - you'll need to add these to your public folder or import them properly
const images = {
  img1: '/img/1.jpg',
  img2: '/img/2.jpg', 
  img3: '/img/3.jpg',
  img1Big: '/img/1_big.jpg',
  img2Big: '/img/2_big.jpg',
  img3Big: '/img/3_big.jpg'
};

// Utility function to wrap lines for text animation
const wrapLines = (lines, wrapType, wrapClass) => {
  lines.forEach(el => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.className = wrapClass;
    el.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

// TextLinesReveal class for text animations
class TextLinesReveal {
  constructor(element) {
    this.DOM = { el: element };
    this.isVisible = false;
    this.initSplitType();
  }

  initSplitType() {
    this.SplitTypeInstance = new SplitType(this.DOM.el, { types: 'lines' });
    wrapLines(this.SplitTypeInstance.lines, 'div', 'oh');
  }

  in(animation = true) {
    this.isVisible = true;
    gsap.killTweensOf(this.SplitTypeInstance.lines);
    
    const timeline = gsap.timeline({
      defaults: { duration: 1.1, ease: 'power4.inOut' }
    });

    timeline.set(this.SplitTypeInstance.lines, { yPercent: 105 });
    
    if (animation) {
      timeline.to(this.SplitTypeInstance.lines, {
        yPercent: 0,
        stagger: 0.05
      });
    } else {
      timeline.set(this.SplitTypeInstance.lines, { yPercent: 0 });
    }
    
    return timeline;
  }

  out(animation = true) {
    this.isVisible = false;
    gsap.killTweensOf(this.SplitTypeInstance.lines);
    
    const timeline = gsap.timeline({
      defaults: { duration: 1.1, ease: 'power4.inOut' }
    });

    if (animation) {
      timeline.to(this.SplitTypeInstance.lines, {
        yPercent: -105,
        stagger: 0.05
      });
    } else {
      timeline.set(this.SplitTypeInstance.lines, { yPercent: -105 });
    }
    
    return timeline;
  }
}

// Item component
const Item = ({ data, index, onItemClick }) => {
  const itemRef = useRef(null);
  const imageInnerRef = useRef(null);

  useEffect(() => {
    const link = itemRef.current?.querySelector('.item__link');
    const imageInner = imageInnerRef.current;

    if (!link || !imageInner) return;

    const handleMouseEnter = () => {
      gsap.killTweensOf(imageInner);
      gsap.to(imageInner, {
        duration: 2,
        ease: 'power4',
        scale: 1.2
      });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf(imageInner);
      gsap.to(imageInner, {
        duration: 0.7,
        ease: 'expo',
        scale: 1
      });
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="item" ref={itemRef}>
      <span className="item__meta">{data.year}</span>
      <h2 className="item__title">{data.name}</h2>
      <div className="item__img">
        <div 
          className="item__img-inner" 
          ref={imageInnerRef}
          style={{ backgroundImage: `url(${data.image})` }}
        />
      </div>
      <p className="item__desc">{data.description}</p>
      <a className="item__link" onClick={() => onItemClick(index)}>view</a>
    </div>
  );
};

// Preview component
const Preview = ({ data, isActive, onBack }) => {
  const previewRef = useRef(null);
  const textLinesRef = useRef([]);

  useEffect(() => {
    // Initialize text lines reveal for paragraphs
    const paragraphs = previewRef.current?.querySelectorAll('.preview__column > p');
    if (paragraphs) {
      textLinesRef.current = Array.from(paragraphs).map(p => new TextLinesReveal(p));
    }

    return () => {
      // Cleanup
      textLinesRef.current = [];
    };
  }, []);

  return (
    <div className={`preview ${isActive ? 'preview--current' : ''}`} ref={previewRef}>
      <div className="preview__img">
        <div 
          className="preview__img-inner" 
          style={{ backgroundImage: `url(${data.bigImage})` }} 
        />
      </div>
      <h2 className="preview__title oh">
        <span className="oh__inner">{data.surname}</span>
      </h2>
      <div className="preview__column preview__column--start">
        <span className="preview__column-title preview__column-title--main oh">
          <span className="oh__inner">{data.name}</span>
        </span>
        <span className="oh">
          <span className="oh__inner">{data.year}</span>
        </span>
      </div>
      <div className="preview__column">
        <h3 className="preview__column-title oh">
          <span className="oh__inner">Location</span>
        </h3>
        <p>{data.location}</p>
      </div>
      <div className="preview__column">
        <h3 className="preview__column-title oh">
          <span className="oh__inner">Material</span>
        </h3>
        <p>{data.material}</p>
      </div>
      <button className="unbutton preview__back" onClick={onBack}>
        <svg width="100px" height="18px" viewBox="0 0 50 9">
          <path vectorEffect="non-scaling-stroke" d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
        </svg>
      </button>
    </div>
  );
};

// Main component
const CoreServices = () => {
  const [currentPreview, setCurrentPreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  
  const contentRef = useRef(null);
  const frameRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRowsRef = useRef([]);
  const previewsRef = useRef([]);

  // Sample data - replace with your actual data
  const itemsData = [
    {
      year: '',
      name: 'Brand Development',
      surname: 'Moulder',
      image: "https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1000&format=pjpg&exif=0&iptc=0",
      bigImage: "https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1000&format=pjpg&exif=0&iptc=0",
      description: 'I am only waiting for love to give myself up at last into his hands. That is why it is so late and why I have been guilty of such omissions.',
      location: 'And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.',
      material: 'At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.'
    },
    {
      year: '',
      name: 'Technology ',
      surname: 'Bennett',
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bigImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: 'They come with their laws and their codes to bind me fast; but I evade them ever, for I am only waiting for love to give myself up at last into his hands.',
      location: 'And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.',
      material: 'At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.'
    },
    {
      year: '',
      name: 'Retail Operations',
      surname: 'Hughes',
      image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bigImage: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=2186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: 'Clouds heap upon clouds and it darkens. Ah, love, why dost thou let me wait outside at the door all alone?',
      location: 'And if it rains, a closed car at four. And we shall play a game of chess, pressing lidless eyes and waiting for a knock upon the door.',
      material: 'At the violet hour, when the eyes and back, turn upward from the desk, when the human engine waits.'
    }
  ];

  // Text animation useEffect
  useEffect(() => {
    if (titleRef.current) {
      // Split text into characters for animation
      const split = new SplitText(titleRef.current, { type: "words, chars" });
      
      console.log("Core Services split text chars:", split.chars); // Debug log
      
      // Set initial state - blurred and invisible
      gsap.set(split.chars, {
        opacity: 0,
        y: 50,
        rotationX: 90,
        transformOrigin: "0% 50% -50px",
        "--blur": "10px",
      });

      // Apply blur effect and gradient to individual characters
      split.chars.forEach((char, index) => {
        char.style.filter = "blur(var(--blur))";
        // Calculate gradient position for each character
        const progress = index / (split.chars.length - 1);
        const color = getGradientColor(progress);
        char.style.color = color;
      });

      // Function to calculate gradient color based on position
      function getGradientColor(progress) {
        // Create smooth gradient from #444444 -> white -> #444444
        if (progress <= 0.5) {
          // First half: #444444 to white
          const factor = progress * 2;
          const gray = Math.round(68 + (255 - 68) * factor);
          return `rgb(${gray}, ${gray}, ${gray})`;
        } else {
          // Second half: white to #444444
          const factor = (progress - 0.5) * 2;
          const gray = Math.round(255 - (255 - 68) * factor);
          return `rgb(${gray}, ${gray}, ${gray})`;
        }
      }

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onStart: () => console.log("Core Services animation started"), // Debug log
          onComplete: () => console.log("Core Services animation completed"), // Debug log
        }
      });

      tl.to(split.chars, {
        duration: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        "--blur": "0px",
        stagger: 0.02,
        ease: "back.out(1.7)",
        onUpdate: function() {
          // Update the filter during animation
          this.targets().forEach(char => {
            char.style.filter = `blur(${char.style.getPropertyValue('--blur')})`;
          });
        }
      });

      // Store the timeline for cleanup
      return () => {
        tl.kill();
        split.revert();
      };
    }
  }, []);

  // Animation functions
  const openItem = (index) => {
    const item = itemsData[index];
    const preview = previewsRef.current[index];
    
    if (!preview) return;

    setIsPreviewVisible(true);
    setCurrentPreview(index);

    const timeline = gsap.timeline({
      defaults: { duration: 1, ease: 'power3.inOut' }
    });

    timeline
      .add(() => {
        contentRef.current?.classList.add('content--hidden');
      }, 'start')
      .addLabel('start', 0)
      .set([preview.querySelectorAll('.oh__inner'), preview.querySelector('.preview__back')], {
        opacity: 0
      }, 'start')
      .to(overlayRowsRef.current, {
        scaleY: 1
      }, 'start')
      .addLabel('content', 'start+=0.6')
      .add(() => {
        document.body.classList.add('preview-visible');
        gsap.set(frameRef.current, { opacity: 0 });
        // Show the previews container
        const previewsContainer = document.querySelector('.previews');
        if (previewsContainer) {
          previewsContainer.classList.add('active');
        }
      }, 'content')
      .to([preview.querySelector('.preview__img'), preview.querySelector('.preview__img-inner')], {
        startAt: { y: (pos) => pos ? '101%' : '-101%' },
        y: '0%'
      }, 'content')
      .add(() => {
        // Animate text lines
        const paragraphs = preview.querySelectorAll('.preview__column > p');
        paragraphs.forEach(p => {
          const textReveal = new TextLinesReveal(p);
          textReveal.in();
        });
        gsap.set(preview.querySelectorAll('.preview__column > p'), {
          opacity: 1,
          delay: 0.1
        });
      }, 'content')
      .to(frameRef.current, {
        ease: 'expo',
        startAt: { y: '-100%', opacity: 0 },
        opacity: 1,
        y: '0%'
      }, 'content+=0.3')
      .to(preview.querySelectorAll('.oh__inner'), {
        ease: 'expo',
        startAt: { yPercent: 101 },
        yPercent: 0,
        opacity: 1
      }, 'content+=0.3')
      .to(preview.querySelector('.preview__back'), {
        opacity: 1
      }, 'content');
  };

  const closeItem = (index) => {
    const preview = previewsRef.current[index];
    
    if (!preview) return;

    const timeline = gsap.timeline({
      defaults: { duration: 1, ease: 'power3.inOut' }
    });

    timeline
      .addLabel('start', 0)
      .to(preview.querySelectorAll('.oh__inner'), {
        yPercent: -101,
        opacity: 0
      }, 'start')
      .add(() => {
        // Animate text lines out
        const paragraphs = preview.querySelectorAll('.preview__column > p');
        paragraphs.forEach(p => {
          const textReveal = new TextLinesReveal(p);
          textReveal.out();
        });
      }, 'start')
      .to(preview.querySelector('.preview__back'), {
        opacity: 0
      }, 'start')
      .to(preview.querySelector('.preview__img'), {
        y: '101%'
      }, 'start')
      .to(preview.querySelector('.preview__img-inner'), {
        y: '-101%'
      }, 'start')
      .to(frameRef.current, {
        opacity: 0,
        y: '-100%',
        onComplete: () => {
          document.body.classList.remove('preview-visible');
          gsap.set(frameRef.current, {
            opacity: 1,
            y: '0%'
          });
        }
      }, 'start')
      .addLabel('grid', 'start+=0.6')
      .to(overlayRowsRef.current, {
        scaleY: 0,
        onComplete: () => {
          setIsPreviewVisible(false);
          setCurrentPreview(null);
          contentRef.current?.classList.remove('content--hidden');
          // Hide the previews container
          const previewsContainer = document.querySelector('.previews');
          if (previewsContainer) {
            previewsContainer.classList.remove('active');
          }
        }
      }, 'grid');
  };

  return (
    <main id='main-core' className={isPreviewVisible ? 'preview-visible' : ''}>
  

  <h2 className="text-7xl md:text-9xl font-bold mb-6 relative text-center">
                            <span ref={titleRef} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                           Core Services
                            </span>
                        </h2>

      <div className="content" ref={contentRef}>
        {itemsData.map((item, index) => (
          <Item 
            key={index}
            data={item}
            index={index}
            onItemClick={openItem}
          />
        ))}
      </div>

      <div className="overlay">
        <div 
          className="overlay__row" 
          ref={(el) => overlayRowsRef.current[0] = el}
        ></div>
        <div 
          className="overlay__row" 
          ref={(el) => overlayRowsRef.current[1] = el}
        ></div>
      </div>

      <section className="previews">
        {itemsData.map((item, index) => (
          <div 
            key={index}
            ref={(el) => previewsRef.current[index] = el}
          >
            <Preview
              data={item}
              isActive={currentPreview === index}
              onBack={() => closeItem(index)}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default CoreServices;

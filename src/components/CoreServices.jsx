import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import ShaderBackground from './ShaderBackground';
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
        scale: 1.1
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
    <div className="item  " ref={itemRef}>

<div className='flex flex-col justify-center items-center gap-7 '>
  
  <div className=' flex justify-center items-center overflow-hidden' > 
    <img  className='w-[80%] rounded-2xl' src={data.image} alt={data.name} />
  </div>

<div className='flex flex-col justify-center items-center gap-4'>

<div className='flex flex-col justify-center items-center'>
  <h3 className='text-3xl  font-bold bg-gradient-to-r from-[#888888] via-white to-[#888888] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]'>{data.name}</h3>
  <p className=' font-light text-gray-400'>{data.description}</p>
</div>


<button onClick={() => onItemClick(index)} className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  View
</button>
  
      


</div>


</div>


<div class="background-gradient-circle"></div>

    </div>
  );
};
// onClick={() => onItemClick(index)}
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
  
  // Refs for scroll reveal animations
  const descriptiveTextRef = useRef([]);
  const chineseCharsRef = useRef([]);

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

  // Scroll reveal animations for descriptive text and Chinese characters
  useEffect(() => {
    // Animate descriptive text paragraphs
    descriptiveTextRef.current.forEach((element, index) => {
      if (element) {
        // Set initial state
        gsap.set(element, {
          opacity: 0,
          y: 50,
          scale: 0.95
        });

        // Create scroll-triggered animation
        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1 // Stagger the animations
        });
      }
    });

    // Animate Chinese characters
    chineseCharsRef.current.forEach((element, index) => {
      if (element) {
        // Set initial state
        gsap.set(element, {
          opacity: 0,
          scale: 0,
          rotation: 45,
          transformOrigin: "center center"
        });

        // Create scroll-triggered animation
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15 // Stagger the animations
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && (
          descriptiveTextRef.current.includes(trigger.trigger) ||
          chineseCharsRef.current.includes(trigger.trigger)
        )) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Handle item click - navigate to page or open preview
  const handleItemClick = (index) => {
    // Index 1 = Technology, navigate to tech page
    if (index === 1) {
      window.location.href = '/tech';
      return;
    }
    
    // Index 2 = Retail Operations, navigate to retail page
    if (index === 2) {
      window.location.href = '/retail';
      return;
    }
    
    // For other items (Brand Development), open the preview
    openItem(index);
  };

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
        gsap.set('.frame', { opacity: 0 });
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
      .to('.frame', {
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
      .to('.frame', {
        opacity: 0,
        y: '-100%',
        onComplete: () => {
          document.body.classList.remove('preview-visible');
          gsap.set('.frame', {
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
    <main id='main-core' className={`${isPreviewVisible ? 'preview-visible' : ''} h-screen w-screen overflow-hidden`}>
      {/* Top Section with Shader Background */}
      <section className="relative w-full h-[45vh] overflow-hidden" style={{ gridArea: 'frame' }}>
        {/* Shader Background */}
        <div className="absolute inset-0 w-full h-full">
          <ShaderBackground opacity={0.8} />
        </div>
        
        
        {/* Content overlay */}
        <div className="relative z-10 w-full h-full flex items-center justify-between px-8 lg:px-30">
          {/* Left side - English text */}
          <div className="flex-1 ">
            <h1 
              ref={titleRef} 
              className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8 text-white"
            >
              CORE SERVICES
            </h1>
            
            {/* Chinese descriptive text */}
            <div className="text-white space-y-2 flex flex-col gap-5 lg:space-y-4 text-sm lg:text-2xl font-semibold leading-relaxed">
              <p ref={(el) => descriptiveTextRef.current[0] = el} className=' flex  gap-4'><span>以"光"为引的「穿越化」买点论</span>  <span>( Prismaeon™ )</span></p>
              <p className=' tracking-[0.3rem]  ' ref={(el) => descriptiveTextRef.current[1] = el}>开创前策 x 科技 x 渠道落地的三位一体服务</p>
              <p className=' tracking-[0.3rem]  ' ref={(el) => descriptiveTextRef.current[2] = el}>突破文化·国界·时间周期的市场及维度局限</p>
              <p className=' tracking-[0.3rem]  ' ref={(el) => descriptiveTextRef.current[3] = el}>打造具备穿越化性质的超级品牌&产品</p>
            </div>
          </div>
          
          {/* Right side - Chinese title with grid layout */}
          <div className="flex-1 flex justify-end items-center">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              {/* Center Glowing Icon with Silver-White Gradient */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            
                
                {/* Mid silver-white glow */}
              
             
                
                {/* Main icon with animated gradient enhancement */}
                <div className="relative scale-[300%]">
                  <div className="relative">
                    {/* Gradient overlay animation */}
                    <div className="absolute inset-0 opacity-80 animate-pulse">
                      <div 
                        className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                        style={{ 
                          maskImage: 'url(/img/logos/icon.svg)', 
                          WebkitMaskImage: 'url(/img/logos/icon.svg)',
                          maskSize: 'contain',
                          WebkitMaskSize: 'contain',
                          maskRepeat: 'no-repeat',
                          WebkitMaskRepeat: 'no-repeat',
                          maskPosition: 'center',
                          WebkitMaskPosition: 'center',
                          animation: 'gradientShift 3s ease-in-out infinite alternate'
                        }}
                      />
                    </div>
                    <img 
                      src="/img/logos/icon.svg" 
                      alt="Core Services Icon" 
                      width={800}
                      height={800}
                      className="relative z-10 opacity-90 filter brightness-110 contrast-105 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)]"
                    />
                    {/* Additional animated glow */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-sm animate-pulse"
                      style={{ 
                        maskImage: 'url(/img/logos/icon.svg)', 
                        WebkitMaskImage: 'url(/img/logos/icon.svg)',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Character grid */}
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                {/* Top-left: 核 */}
                <div className="flex items-center justify-center pr-4 pb-2">
                  <span ref={(el) => chineseCharsRef.current[0] = el} className="text-4xl lg:text-6xl font-bold text-white">核</span>
                </div>
                
                {/* Top-right: 心 */}
                <div className="flex items-center justify-center pl-4 pb-2">
                  <span ref={(el) => chineseCharsRef.current[1] = el} className="text-4xl lg:text-6xl font-bold text-white">心</span>
                </div>
                
                {/* Bottom-left: 服 */}
                <div className="flex items-center justify-center pr-4 pt-2">
                  <span ref={(el) => chineseCharsRef.current[2] = el} className="text-4xl lg:text-6xl font-bold text-white">服</span>
                </div>
                
                {/* Bottom-right: 务 */}
                <div className="flex items-center justify-center pl-4 pt-2">
                  <span ref={(el) => chineseCharsRef.current[3] = el} className="text-4xl lg:text-6xl font-bold text-white">务</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original Cards Layout - Constrained to remaining viewport */}
      <div className="content h-[55vh] overflow-y-auto" ref={contentRef}>
        {itemsData.map((item, index) => (
          <Item 
            key={index}
            data={item}
            index={index}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

      {/* Overlay for animations */}
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

      {/* Preview section */}
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

export default CoreServices;// Add CSS for gradient animation
const style = document.createElement('style');
style.textContent = `
  @keyframes gradientShift {
    0% {
      background: linear-gradient(45deg, #60a5fa, #a855f7, #ec4899);
    }
    33% {
      background: linear-gradient(45deg, #34d399, #60a5fa, #a855f7);
    }
    66% {
      background: linear-gradient(45deg, #fbbf24, #34d399, #60a5fa);
    }
    100% {
      background: linear-gradient(45deg, #ec4899, #fbbf24, #34d399);
    }
  }
`;
document.head.appendChild(style);


import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './css/CoverPageTransition.css';
import ElectricBorder from './ui/electric-border';

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

// TechnologyBox component
const TechnologyBox = ({ data, index, onDetailClick, onVideoClick }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const handleMouseEnter = () => {
      gsap.to(box, {
        duration: 0.3,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(255,255,255,0.1)',
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(box, {
        duration: 0.3,
        scale: 0.98,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        ease: 'power2.out'
      });
    };

    box.addEventListener('mouseenter', handleMouseEnter);
    box.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      box.removeEventListener('mouseenter', handleMouseEnter);
      box.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <ElectricBorder
    speed={1}
    chaos={0.5}
    thickness={2}
    style={{ borderRadius: 16 }}
    >

    <div 
      className="technology-box scale-[98%] relative p-12 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl shadow-xl min-h-[400px] flex flex-col justify-between"
      ref={boxRef}
      >
      <div>
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 text-center border-b border-gray-600/30 pb-6">
          {data.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-gray-300 text-center mb-8 leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-auto">
        <button 
          onClick={() => onDetailClick(index)}
          className="px-6 py-2 bg-transparent border border-gray-500/50 text-gray-300 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm"
        >
          detail
        </button>
        <button 
          onClick={() => onVideoClick(index)}
          className="px-6 py-2 bg-transparent border border-gray-500/50 text-gray-300 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm"
          >
          video
        </button>
      </div>
    </div>
</ElectricBorder>
  );
};

// AnimatedTechnologyDetail component matching original preview layout
const AnimatedTechnologyDetail = ({ data, isActive, onBack }) => {
  const detailRef = useRef(null);

  return (
    <div className={`preview ${isActive ? 'preview--current' : ''}`} ref={detailRef}>
      <div className="preview__img">
        <div 
          className="preview__img-inner" 
          style={{ 
            backgroundImage: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)`,
            backgroundSize: 'cover'
          }} 
        />
      </div>
      <h2 className="preview__title oh">
        <span className="oh__inner">{data.title}</span>
      </h2>
      <div className="preview__column preview__column--start">
        <span className="preview__column-title preview__column-title--main oh">
          <span className="oh__inner">{data.titleEn}</span>
        </span>
        <span className="oh">
          <span className="oh__inner">Core Technology</span>
        </span>
      </div>
      <div className="preview__column">
        <h3 className="preview__column-title oh">
          <span className="oh__inner">Description</span>
        </h3>
        <p>{data.description}</p>
      </div>
      <div className="preview__column">
        <h3 className="preview__column-title oh">
          <span className="oh__inner">Technical Features</span>
        </h3>
        <div className="space-y-2">
          {data.features.slice(0, 5).map((feature, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {feature}
            </p>
          ))}
        </div>
      </div>
      <button className="unbutton preview__back" onClick={onBack}>
        <svg width="100px" height="18px" viewBox="0 0 50 9">
          <path vectorEffect="non-scaling-stroke" d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path>
        </svg>
      </button>
    </div>
  );
};

// Simple video modal (keeping original modal style for video)
const VideoModal = ({ data, isActive, onBack }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {data.title} - Video Demo
        </h2>
        
        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-lg">Video content will be displayed here</p>
            <p className="text-sm mt-2">Integration with video player required</p>
          </div>
        </div>

        <button 
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold"
          onClick={onBack}
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Main component
const CoreServices = () => {
  const [currentDetail, setCurrentDetail] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  const contentRef = useRef(null);
  const frameRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRowsRef = useRef([]);
  const detailsRef = useRef([]);

  // Two core technologies data
  const technologiesData = [
    {
      id: 'hph',
      title: 'HPH纳米破碎-动态交互',
      titleEn: 'HPH Nano Crushing Dynamic Interaction',
      subtitle: '世界顶尖的破碎科技双轴转载，革新产品全球竞争力',
      subtitleEn: 'World-class crushing technology with dual-axis transfer, revolutionizing global product competitiveness',
      description: '我们拥有内地**世界级的专利技术**，它针对产品非常的高效率。而是能够让产品全系列的商业模式价值链提升的高的要求。',
      descriptionEn: 'We possess mainland China\'s **world-class patented technology**, which is highly efficient for products and can enhance the value chain of the entire product series business model.',
      features: [
        '**破碎器械（破碎应用）：**',
        '**制造/维修：** 制造全套控制，水利系统，风雨系统，K线原理，风险无穷**最新系列**',
        '**NFC类汇/检查蛋白：** 实现**无轮加速力**，K线原理，口感组织效率**，品质全面超越传统HPP及UHT技术产品**',
        '**条纹级：** 实际内容的制作过程**制造级别**',
        '**品质成（器械，复合调理计）：** 内外工艺流、听水、延伸上感应液体内保险含量**',
        '**保质品/可爱食品：** 制作外观级别的制作过程，教育产品稳定性、设置及有效分解效率**',
        '**大健康与美容装备：**',
        '**山药材料光亮级：** 遵循有效分解基本制造流程，实现100%的材料利用**',
        '**化妆品液/药膏：** 新药外观级别化体，提升产品稳定性、设置及有效分解效率收敛**'
      ]
    },
    {
      id: 'pef',
      title: 'PEF超水温脉冲中断的修技术',
      titleEn: 'PEF Ultra Water Temperature Pulse Interruption Technology',
      subtitle: '在这两项技术的协同作用下',
      subtitleEn: 'Under the synergistic effect of these two technologies',
      description: '不仅仅是产品保现货产品全套技术的多个维度一体化原理，将其与竞争本，同时能与产品全系列的协同作用，生存力，竞争力，制造能力。均能够起到提升的技术性能。',
      descriptionEn: 'Not only does it provide integrated principles across multiple dimensions of complete product technology, but it also synergizes with the entire product series, enhancing survival capability, competitiveness, and manufacturing ability.',
      features: [
        '**我们的技术已成功应用于千万级别以下领域，完整实现合成化需求：**',
        '**保质成（器械，复合调理计）：** 内外工艺流、听水、延伸上感应液体内保险含量**',
        '**NFC类汇/检查蛋白：** 实现**无轮加速力**，K线原理，口感组织效率**，品质全面超越传统HPP及UHT技术产品**',
        '**条纹级：** 实际内容的制作过程**制造级别**',
        '**大健康与美容装备：**',
        '**保质品/可爱食品：** 制作外观级别的制作过程，教育产品稳定性、设置及有效分解效率**',
        '**山药材料光亮级：** 遵循有效分解基本制造流程，实现100%的材料利用**',
        '**化妆品液/药膏：** 新药外观级别化体，提升产品稳定性、设置及有效分解效率收敛**'
      ]
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

  // Animation functions for detail view (using original preview animation structure)
  const openDetail = (index) => {
    const tech = technologiesData[index];
    const preview = detailsRef.current[index];
    
    if (!preview) return;

    setIsDetailVisible(true);
    setCurrentDetail(index);

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
        const paragraphs = preview.querySelectorAll('.preview__column > p, .preview__column > div');
        paragraphs.forEach(p => {
          const textReveal = new TextLinesReveal(p);
          textReveal.in();
        });
        gsap.set(preview.querySelectorAll('.preview__column > p, .preview__column > div'), {
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

  const closeDetail = (index) => {
    const preview = detailsRef.current[index];
    
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
        const paragraphs = preview.querySelectorAll('.preview__column > p, .preview__column > div');
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
          setIsDetailVisible(false);
          setCurrentDetail(null);
          contentRef.current?.classList.remove('content--hidden');
          // Hide the previews container
          const previewsContainer = document.querySelector('.previews');
          if (previewsContainer) {
            previewsContainer.classList.remove('active');
          }
        }
      }, 'grid');
  };

  // Simple handlers for video (keeping modal style for video)
  const handleVideoClick = (index) => {
    setCurrentVideo(index);
    setIsVideoVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
    setIsVideoVisible(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <main id='main-core' className={` bg-black relative overflow-hidden ${isDetailVisible ? 'preview-visible' : ''}`}>
      {/* Title */}
      {/* <div className="text-center mb-16 pt-20">
        <h2 className="text-7xl md:text-9xl font-bold mb-6 relative">
          <span ref={titleRef} className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            Core Services
          </span>
        </h2>
      </div> */}

      {/* Description */}
      <div className="text-center  px-8">
        <p className="text-gray-300 text-2xl max-w-4xl mx-auto leading-relaxed  mb-2">
          世界顶尖的破碎科技双轴转载，革新产品全球竞争力
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          我们拥有内地**世界级的专利技术**，它针对产品非常的高效率。
          而是能够让产品全系列的商业模式价值链提升的高的要求。
        </p>
      </div>

      {/* Technologies Grid */}
      <div className="max-w-7xl mx-auto px-8 " ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {technologiesData.map((tech, index) => (
            <TechnologyBox 
              key={tech.id}
              data={tech}
              index={index}
              onDetailClick={openDetail}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>

  

      </div>

      
<div className="text-center  px-8">
   
   <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
   在这两项技术的协同作用下，
不仅实现了高品质保鲜产品在延长的分销链条一段保鲜期·摒耗与成本，
同时提升了产品体验的全新维度的可感性：生命力、竞争力、和韧力。
为您缔造绝对无法被超越的技术壁垒。。
   </p>
 </div>

  

      {/* Overlay for transitions */}
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

      {/* Previews section - fixed positioned like original */}
      <section className="previews">
        {technologiesData.map((tech, index) => (
          <div 
            key={tech.id}
            ref={(el) => detailsRef.current[index] = el}
          >
            <AnimatedTechnologyDetail
              data={tech}
              isActive={currentDetail === index}
              onBack={() => closeDetail(index)}
            />
          </div>
        ))}
      </section>

      {/* Technology Video Modal (simple overlay) */}
      {isVideoVisible && currentVideo !== null && (
        <VideoModal
          data={technologiesData[currentVideo]}
          isActive={isVideoVisible}
          onBack={handleCloseVideo}
        />
      )}



    </main>
  );
};

export default CoreServices;

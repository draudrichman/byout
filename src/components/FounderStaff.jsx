import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const foundersData = [
  {
    name: "JASON CHENG  成金海",
    title: "Co-Founder & CTO",
    role: "MDL实验室创办人 前BY年轻化创新集团CEO 全球品牌年轻态买点论开创者",
    img: "/founders/founder2.jpg",
  },
  {
    name: "VINCE TREY  崔巽燊",
    title: "Co-Founder & CEO",
    role: "全球化创意美学设计专家 品牌出海战略架构师",
    img: "/founders/founder.png",
  },
  {
    name: "CALVIN LU",
    title: "Co-Founder & CMO",
    role: "全球渠道拓展专家",
    img: "/founders/founder3.webp",
  },
  {
    name: "Finn Guan 管海峰",
    title: "Co-Founder & CMO",
    role: "渠道战略专家",
    img: "/founders/founder5.jpg",
  },
  {
    name: "刘宇 Yukim",
    title: "Co-Founder & CMO",
    role: "渠道战略专家",
    img: "/founders/founder4.jpg",
  },
  {
    name: "李清禾",
    title: "Co-Founder & CMO",
    role: "品牌视觉设计专家",
    img: "/founders/founder6.jpg",
  },
  {
    name: "陈亦森",
    title: "Co-Founder & CMO",
    role: "内容创意专家",
    img: "/founders/founder7.jpg",
  },
  {
    name: "程伟业",
    title: "Co-Founder & CMO",
    role: "项目管理专家",
    img: "/founders/founder8.jpg",
  },
  {
    name: "刘予舒",
    title: "Co-Founder & CMO",
    role: "用户研究专家",
    img: "/founders/founder9.jpg",
  },
  {
    name: "程清",
    title: "Co-Founder & CMO",
    role: "品牌运营专家",
    img: "/founders/founder10.jpg",
  },
  {
    name: "饶树亮",
    title: "Co-Founder & CMO",
    role: "品牌策划专家",
    img: "/founders/founder11.jpg",
  },
  {
    name: "李沐礼",
    title: "Co-Founder & CMO",
    role: "产品设计专家",
    img: "/founders/founder12.jpg",
  },
  // {
  //   name: "John Doe",
  //   title: "Co-Founder & CMO",
  //   role: "全球渠道拓展专家",
  //   img: "/founders/plceholder.png",
  // },
  // {
  //   name: "John Doe",
  //   title: "Co-Founder & CMO",
  //   role: "全球渠道拓展专家",
  //   img: "/founders/plceholder.png",
  // },
  // {
  //   name: "John Doe",
  //   title: "Co-Founder & CMO",
  //   role: "全球渠道拓展专家",
  //   img: "/founders/plceholder.png",
  // },
  // {
  //   name: "John Doe",
  //   title: "Co-Founder & CMO",
  //   role: "全球渠道拓展专家",
  //   img: "/founders/plceholder.png",
  // },
];

const FoundersMarquee = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const marquee = marqueeRef.current;
    const firstSet = marquee.querySelector(".marquee-set");
    if (!firstSet) return;

    const cardWidth = 320; // Approximate width of card + gap
    const totalWidth = cardWidth * foundersData.length;

    // Auto-scroll animation
    const startAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      const currentX = gsap.getProperty(marquee, "x");
      const remainingDistance = totalWidth + currentX;
      const duration = remainingDistance / 30; // 30px per second

      animationRef.current = gsap.to(marquee, {
        x: -totalWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const numX = parseFloat(x);
            return `${numX % totalWidth}px`;
          },
        },
      });
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Handle drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = gsap.getProperty(marqueeRef.current, "x");

    // Pause animation
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragCurrentX.current = gsap.getProperty(marqueeRef.current, "x");

    // Pause animation
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  // Handle drag move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const newX = dragCurrentX.current + deltaX;

    gsap.set(marqueeRef.current, { x: newX });
    scrollPosition.current = newX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    const newX = dragCurrentX.current + deltaX;

    gsap.set(marqueeRef.current, { x: newX });
    scrollPosition.current = newX;
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Resume animation from current position
    const cardWidth = 320;
    const totalWidth = cardWidth * foundersData.length;
    const currentX = gsap.getProperty(marqueeRef.current, "x");

    // Normalize position
    let normalizedX = currentX % totalWidth;
    if (normalizedX > 0) normalizedX -= totalWidth;

    gsap.set(marqueeRef.current, { x: normalizedX });

    const remainingDistance = totalWidth + normalizedX;
    const duration = remainingDistance / 30;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(marqueeRef.current, {
      x: -totalWidth,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const numX = parseFloat(x);
          return `${numX % totalWidth}px`;
        },
      },
    });
  };

  // Duplicate founders for seamless loop
  const duplicatedFounders = [
    ...foundersData,
    ...foundersData,
    ...foundersData,
  ];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <div ref={marqueeRef} className="flex gap-6">
        {/* First set */}
        <div className="marquee-set flex gap-6 shrink-0">
          {duplicatedFounders.map((founder, index) => (
            <div
              key={`set1-${index}`}
              className="founder-card group shrink-0 w-72 pointer-events-none"
            >
              <div
                className="relative overflow-hidden aspect-[3/4] mb-4 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${founder.img})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              <h4 className="text-lg font-light text-gray-400 mb-1">
                {founder.name}
              </h4>
              <p className="text-sm text-gray-400 leading-tight">
                {founder.role.split(" ").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        {/* Second set for seamless loop */}
        <div className="marquee-set flex gap-6 shrink-0">
          {duplicatedFounders.map((founder, index) => (
            <div
              key={`set2-${index}`}
              className="founder-card group shrink-0 w-72 pointer-events-none"
            >
              <div
                className="relative overflow-hidden aspect-[3/4] mb-4 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${founder.img})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              <h4 className="text-lg font-light text-gray-400 mb-1">
                {founder.name}
              </h4>
              <p className="text-sm text-gray-400 leading-tight">
                {founder.role.split(" ").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-sm pointer-events-none">
        ← Drag to explore →
      </div>
    </div>
  );
};

const FounderStaff = () => {
  const teamSectionRef = useRef(null);
  const foundersRef = useRef(null);
  const teamGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".founder-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: foundersRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".team-member",
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: {
            amount: 1.2,
            from: "start",
            grid: "auto",
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: teamGridRef.current,
            start: "top 85%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".team-heading",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={teamSectionRef}
      id="team-introduction"
      className="py-24 px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10 team-heading">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              MEET OUR
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              VISIONARIES
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
            领导团队 | LEADERSHIP TEAM
          </p>
        </div>

        {/* Founders */}
        <div ref={foundersRef} className="mb-32">
          <h3 className="text-3xl font-light mb-12 pb-4 border-b border-gray-800">
            <span className="text-gray-600">FOUNDERS / 创始人</span>
          </h3>
          <FoundersMarquee />
        </div>

        {/* Team Grid */}
        {/* <div ref={teamGridRef}>
          <h3 className="text-3xl font-light mb-12 pb-4 border-b border-gray-800">
            <span className="text-gray-400">OUR TEAM/ 团队成员</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="team-member group cursor-pointer">
                <div className="relative overflow-hidden aspect-square rounded-lg">
                  <img
                    src={`/staff/${index + 1}.png`}
                    alt={`Team member ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-sm font-medium">Team Member</p>
                      <p className="text-xs text-gray-400">Director</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div ref={teamGridRef} className="py-24">
          <div className="max-w-7xl mx-auto">
            {/* Two-column layout for medium screens and up */}
            <div className="flex flex-col md:flex-row h-full items-stretch">
              {/* LEFT COLUMN: Large Title Block */}
              <div className="team-title-block flex-1 mb-12 md:mb-0 md:w-3/5 lg:w-3/5 text-white h-full flex flex-col justify-between items-start text-left">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase max-w-full">
                  A GROUP OF EXTRAORDINARY PARTNERS HAVE GATHERED HERE.
                </h2>
                <p className="text-xl md:text-3xl lg:text-5xl text-gray-400 leading-snug break-words max-w-full">
                  这里汇聚了
                  <br />
                  一群不甘平庸的
                  <br />
                  伙伴。
                </p>
              </div>

              {/* RIGHT COLUMN: Team Grid */}
              <div className="md:w-2/5 lg:w-2/5 h-full">
                <div className="grid grid-cols-4 gap-0 h-full">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className="team-member cursor-pointer text-white"
                    >
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={`/staff/${index + 1}.png`}
                          alt={`Team member ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStaff;

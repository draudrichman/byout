import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
    <section ref={teamSectionRef} className="py-24 px-12">
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
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 lg:gap-38">
            {[
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
            ].map((founder, index) => (
              <div key={index} className="founder-card group">
                <div
                  className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg"
                  style={{
                    backgroundImage: `url(${founder.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  {/* <div className="absolute inset-0 flex items-center justify-center"></div> */}
                  {/* <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Leading innovation and strategic vision for global market
                      expansion.
                    </p>
                  </div> */}
                </div>
                <h4 className="text-2xl font-light text-gray-400 mb-2">
                  {founder.name}
                </h4>
                {/* <p className="text-sm text-gray-400 mb-1">{founder.title}</p> */}
                <p className="text-md text-gray-400">
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
                  这里汇聚了<br/>一群不甘平庸的<br/>伙伴。
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

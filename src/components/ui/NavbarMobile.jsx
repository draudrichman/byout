import React, { useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import AnimatedLogo from "./AnimatedLogo";

const NavbarMobile = ({ isLoaded }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isLoaded) {
      const startTimer = setTimeout(() => {
        setStartAnimation(true);
      }, 100);

      return () => clearTimeout(startTimer);
    }
  }, [isLoaded]);

  useEffect(() => {
    let animationTimer;
    if (startAnimation) {
      animationTimer = setTimeout(() => {
        setIsAnimationDone(true);
      }, 6000);
    }

    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    };
  }, [startAnimation]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    if (isAnimationDone) {
      setIsDrawerOpen((prev) => !prev);
    }
  };

  const handleNavClick = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setIsDrawerOpen(false);

    requestAnimationFrame(() => {
      const navbarHeight = 0;

      if (lenis) {
        setTimeout(() => {
          const targetRect = target.getBoundingClientRect();
          const currentScrollY =
            lenis.scroll ||
            window.pageYOffset ||
            document.documentElement.scrollTop;
          const targetY = targetRect.top + currentScrollY - navbarHeight;

          lenis.scrollTo(targetY, {
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            immediate: false,
            lock: false,
          });
        }, 100);
      } else {
        const targetRect = target.getBoundingClientRect();
        const currentScrollY =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetY = targetRect.top + currentScrollY - navbarHeight;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      try {
        history.pushState(null, "", `#${id}`);
      } catch {
        // Ignore history errors
      }
    });
  };

  const menuItems = [
    { id: "about", label: "关于" },
    { id: "core-services", label: "核心服务" },
    { id: "service-process", label: "服务流程" },
    { id: "channel-layout", label: "渠道布局" },
    { id: "team-introduction", label: "团队介绍" },
    { id: "contact", label: "联系" },
  ];

  return (
    <>
      {/* Fullscreen Black BG for Logo Animation */}
      <div
        id="logo-bg"
        className={`fixed inset-0 z-[999] bg-black transition-opacity duration-1200 ${
          isAnimationDone ? "logo-bg-fade" : ""
        }`}
        style={{
          opacity: isAnimationDone ? 0 : 1,
          pointerEvents: isAnimationDone ? "none" : "auto",
        }}
      ></div>

      {/* Animated Logo - Top Center */}
      <div
        id="logo-animation"
        className={`fixed z-[1000] w-[250px] h-[250px] ${
          isAnimationDone ? "cursor-pointer" : ""
        }`}
        style={{
          top:
            startAnimation && isAnimationDone ? "10px" : "calc(50vh - 150px)",
          left:
            startAnimation && isAnimationDone
              ? "calc(50% - 31.5px)"
              : "calc(50% - 125px)",
          width: startAnimation && isAnimationDone ? "63px" : "250px",
          height: startAnimation && isAnimationDone ? "63px" : "250px",
          animation:
            startAnimation && !isAnimationDone
              ? "slide-up-center 0.5s ease-out 5.5s forwards"
              : "none",
          opacity: startAnimation ? 1 : 0,
          pointerEvents: isAnimationDone ? "auto" : "none",
          transition: isAnimationDone ? "none" : "opacity 0.3s ease-in",
        }}
        onClick={toggleDrawer}
      >
        {/* Logo Ring */}
        <div
          className="absolute logo-ring"
          style={{
            display: startAnimation ? "block" : "none",
            width: "100%",
            height: "100%",
          }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* SVG Logo */}
        <div
          className="w-full h-full relative z-10 opacity-0"
          style={{
            animation: startAnimation
              ? "show-logo 0.1s ease-in 1.5s forwards"
              : "none",
            pointerEvents: "none",
          }}
        >
          <AnimatedLogo startAnimation={startAnimation} />
        </div>
      </div>

      {/* Drawer Overlay */}
      <div
        className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer Menu */}
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <nav className="drawer-nav">
          {menuItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="menu-item font-chinese"
              style={{
                animationDelay: isDrawerOpen ? `${index * 0.08}s` : "0s",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Logo Animation */
        #logo-bg {
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-bg-fade {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        @keyframes slide-up-center {
          0% {
            top: calc(50vh - 125px);
            left: calc(50% - 125px);
            width: 250px;
            height: 250px;
          }
          100% {
            top: 10px;
            left: calc(50% - 31.5px);
            width: 63px;
            height: 63px;
          }
        }

        @keyframes show-logo {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Logo Ring Animations */
        .logo-ring div {
          display: block;
          position: absolute;
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          margin: 5px;
          border: 1px solid #fff;
          border-radius: 50%;
          animation: logo-ring 1.5s cubic-bezier(0.5, 0, 0.5, 1);
          border-color: #fff transparent transparent transparent;
        }

        .logo-ring div:nth-child(1) {
          animation: right 1.4s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }

        .logo-ring div:nth-child(2) {
          animation: bottom 1.4s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }

        .logo-ring div:nth-child(3) {
          animation: left 1.4s cubic-bezier(0.5, 0, 0.5, 1) forwards;
        }

        @keyframes right {
          100% {
            transform: rotate(90deg);
          }
        }

        @keyframes bottom {
          100% {
            transform: rotate(180deg);
          }
        }

        @keyframes left {
          100% {
            transform: rotate(270deg);
          }
        }

        @keyframes logo-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Drawer Overlay */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Drawer */
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 320px;
          height: 100vh;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .drawer.open {
          transform: translateX(0);
        }

        /* Drawer Navigation */
        .drawer-nav {
          display: flex;
          flex-direction: column;
          padding: 120px 2rem 2rem;
          gap: 0;
        }

        .menu-item {
          display: block;
          padding: 1.5rem 0;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(30px);
        }

        .drawer.open .menu-item {
          animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .menu-item:hover {
          padding-left: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .menu-item:active {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Scrollbar */
        .drawer::-webkit-scrollbar {
          width: 4px;
        }

        .drawer::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .drawer::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default NavbarMobile;

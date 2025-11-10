import React, { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

const Navbar = ({ isLoaded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Start the animation once the loading page is complete
      const startTimer = setTimeout(() => {
        setStartAnimation(true);
      }, 100); // A small delay to ensure smooth transition

      return () => clearTimeout(startTimer);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Only set the animation completion timer if the animation has started
    let animationTimer;
    if (startAnimation) {
      animationTimer = setTimeout(() => {
        setIsAnimationDone(true);
      }, 6000); // 5.5s for slide-up + 0.5s duration
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationTimer) {
        clearTimeout(animationTimer);
      }
    };
  }, [startAnimation]);

  // Demo: Automatically open menu after logo lands, then close after a few seconds
  useEffect(() => {
    let demoOpenTimer;
    let demoCloseTimer;
    if (isAnimationDone && !isMenuOpen) {
      // Open menu after logo lands
      demoOpenTimer = setTimeout(() => {
        setIsMenuOpen(true);
        // Close menu after 2.5 seconds
        demoCloseTimer = setTimeout(() => {
          setIsMenuOpen(false);
        }, 2500);
      }, 400); // slight delay after animation
    }
    return () => {
      clearTimeout(demoOpenTimer);
      clearTimeout(demoCloseTimer);
    };
  }, [isAnimationDone]);

  const toggleMenu = () => {
    if (isAnimationDone) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <>
      {/* Fullscreen Black BG for Logo Animation - visible from start */}
      <div
        id="logo-bg"
        className={`fixed inset-0 z-[99] bg-black transition-opacity duration-1200 ${
          isAnimationDone ? "logo-bg-fade" : ""
        }`}
        style={{
          opacity: isAnimationDone ? 0 : 1,
          pointerEvents: isAnimationDone ? "none" : "auto",
        }}
      ></div>

      {/* Animated Logo */}
      <div
        id="logo-animation"
        className={`fixed top-[calc(50vh-175px)] left-[calc(50%-175px)] z-[100] w-[350px] h-[350px] ${
          isAnimationDone ? "cursor-pointer" : ""
        }`}
        style={{
          animation: startAnimation
            ? "slide-up 0.5s ease-out 5.5s forwards"
            : "none",
          opacity: startAnimation ? 1 : 0,
          pointerEvents: isAnimationDone ? "auto" : "auto",
          transition: "opacity 0.3s ease-in",
        }}
        onClick={toggleMenu}
      >
        {/* Logo Ring */}
        <div
          className="absolute w-[350px] h-[350px] logo-ring"
          style={{ display: startAnimation ? "block" : "none" }}
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

      {/* Navigation Bar */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full h-25 z-[99] glossy-navbar ${
          isMenuOpen ? "line-active navbar-bg-animate" : "navbar-bg-none"
        }`}
        style={{
          borderBottom: "0px solid white",
        }}
      >
        <ul className="list-none m-0 p-0 flex h-full items-center justify-between w-full px-[5%]">
          <div className="flex flex-1 justify-evenly">
            <li
              className={`nav-item-left ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0.2s" : "0s" }}
            >
              <a
                href="#about"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                关于
              </a>
            </li>
            <li
              className={`nav-item-left ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0.1s" : "0.1s" }}
            >
              <a
                href="#blog"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                博客
              </a>
            </li>
            <li
              className={`nav-item-left ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0s" : "0.2s" }}
            >
              <a
                href="#services"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                服务
              </a>
            </li>
          </div>

          {/* Center space for logo */}
          <div
            className="flex justify-center items-center min-w-[80px]"
            style={{ zIndex: 101 }}
          >
            {/* Logo space - logo appears here after animation */}
          </div>

          <div className="flex flex-1 justify-evenly">
            <li
              className={`nav-item-right ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0s" : "0.2s" }}
            >
              <a
                href="#contact"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                联系
              </a>
            </li>
            <li
              className={`nav-item-right ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0.1s" : "0.1s" }}
            >
              <a
                href="#contact-info"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                联系方式
              </a>
            </li>
            <li
              className={`nav-item-right ${isMenuOpen ? "open" : ""}`}
              style={{ transitionDelay: isMenuOpen ? "0.2s" : "0s" }}
            >
              <a
                href="#contact-us"
                className="text-white no-underline text-[1.4em] nav-link"
              >
                联系
              </a>
            </li>
          </div>
        </ul>
      </nav>

      {/* Styles */}
      <style jsx>{`
        #logo-bg {
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .logo-bg-fade {
          opacity: 0 !important;
          pointer-events: none !important;
        }
        /* .logo-fade removed: logo no longer fades out after animation */

        #navbar,
        .glossy-navbar {
          transition: border-bottom 0.5s ease-in,
            background 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar-bg-none {
          background: transparent !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
          border-bottom: 1px solid transparent !important;
        }
        .navbar-bg-animate {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(12px) saturate(180%) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.35) !important;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08) !important;
          border-radius: 0 0 12px 12px !important;
        }

        #navbar.line-active {
          border-bottom: 1px solid white;
        }

        .nav-item-left,
        .nav-item-right {
          opacity: 0;
          transform: translateX(0);
          transition: opacity 0.3s ease-out, transform 0.4s ease-out;
        }

        .nav-item-left.open {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-item-right.open {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-item-left:not(.open) {
          transform: translateX(20vw);
        }
        .nav-item-right:not(.open) {
          transform: translateX(-20vw);
        }

        .nav-link {
          position: relative;
          display: inline-block;
          padding-bottom: 5px;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background-color: white;
          transition: all 0.3s ease-out;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        @keyframes slide-up {
          100% {
            top: -125px;
            transform: scale(0.2);
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
          width: 334px;
          height: 334px;
          margin: 8px;
          border: 2px solid #fff;
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
      `}</style>
    </>
  );
};

export default Navbar;

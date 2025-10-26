import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Animated Logo */}
      <div
        id="logo-animation"
        className="fixed top-[100px] left-[calc(50%-175px)] z-[100] w-[350px] h-[350px]"
        style={{
          animation: "slide-up 0.5s ease-out 5.5s forwards",
        }}
      >
        {/* Logo Ring */}
        <div className="absolute w-[350px] h-[350px] logo-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* SVG Logo */}
        <object
          data="/navbar/Preloader2 transparent.svg"
          type="image/svg+xml"
          width="350"
          height="350"
          className="w-full h-full relative z-10 opacity-0"
          style={{ animation: "show-logo 0.1s ease-in 1.5s forwards" }}
        >
          <img
            src="/navbar/Preloader2 transparent.svg"
            alt="Preloader Logo"
            width="350"
            height="350"
            className="w-full h-full"
          />
        </object>
      </div>

      {/* Navigation Bar */}
      <nav
        id="navbar"
        className="fixed top-0 left-0 w-full h-20 z-[98]"
        style={{
          animation: "line 0.5s ease-in 6s forwards",
          borderBottom: "0px solid white",
          background: "inherit",
        }}
      >
        <ul className="list-none m-0 p-0 flex h-full items-center justify-between w-full px-[5%]">
          <div className="flex flex-1 justify-evenly">
            <li>
              <a
                href="#about"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                关于
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                博客
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                服务
              </a>
            </li>
          </div>

          {/* Center space for logo */}
          <div className="flex justify-center items-center min-w-[80px]">
            {/* Logo space - logo appears here after animation */}
          </div>

          <div className="flex flex-1 justify-evenly">
            <li>
              <a
                href="#contact"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                联系
              </a>
            </li>
            <li>
              <a
                href="#contact-info"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                联系方式
              </a>
            </li>
            <li>
              <a
                href="#contact-us"
                className="text-white no-underline text-[1.4em] opacity-0"
                style={{ animation: "show-text 0.5s ease-in 6.5s forwards" }}
              >
                联系
              </a>
            </li>
          </div>
        </ul>
      </nav>

      {/* Styles */}
      <style jsx>{`
        * {
          scroll-behavior: smooth;
          box-sizing: border-box;
        }

        @keyframes line {
          0% {
            width: 0;
          }
          100% {
            border-bottom: 1px solid white;
            background: inherit;
          }
        }

        @keyframes slide-up {
          100% {
            top: -135px;
            transform: scale(0.2);
          }
        }

        @keyframes show-text {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
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

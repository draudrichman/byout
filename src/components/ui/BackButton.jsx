import React from "react";

const BackButton = ({ className = "" }) => {
  return (
    <a
      href="/"
      className={`fixed top-8 left-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl ${className}`}
      style={{ padding: "0.75rem 1.5rem" }}
      aria-label="Back to Home"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform group-hover:-translate-x-1 transition-transform duration-300"
      >
        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
      </svg>
      <span className="font-medium">Back to Home</span>
    </a>
  );
};

export default BackButton;

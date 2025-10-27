import React from "react";

const Button = ({ text, icon, className = "", onClick }) => {
  return (
    <button
      className={`relative flex items-center justify-center bg-transparent text-white border border-white/12 h-9 text-[0.625rem] uppercase tracking-[2px] font-medium cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Top-left corner */}
      <span className="absolute top-0 left-0 w-1 h-1 -translate-x-[1px] -translate-y-[1px] border-t border-l border-white transition-all duration-250 ease-in-out group-hover:w-full" />

      {/* Top-right corner */}
      <span className="absolute top-0 right-0 w-1 h-1 translate-x-[1px] -translate-y-[1px] border-t border-r border-white transition-all duration-250 ease-in-out group-hover:h-full" />

      {/* Bottom-left corner */}
      <span className="absolute bottom-0 left-0 w-1 h-1 -translate-x-[1px] translate-y-[1px] border-b border-l border-white transition-all duration-250 ease-in-out group-hover:h-full" />

      {/* Bottom-right corner */}
      <span className="absolute bottom-0 right-0 w-1 h-1 translate-x-[1px] translate-y-[1px] border-b border-r border-white transition-all duration-250 ease-in-out group-hover:w-full" />

      {/* Plus icon on the left */}
      <span className="h-full border-r border-white/12 flex items-center justify-center px-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:rotate-90"
        >
          <path
            d="M6 1V11M1 6H11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {icon && (
        <span className="h-full border-r border-white/12 p-2">{icon}</span>
      )}
      <span className="px-3">{text}</span>
    </button>
  );
};

export default Button;

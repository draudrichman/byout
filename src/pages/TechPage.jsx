import { Suspense, lazy, useEffect } from "react";

// 使用新引入的 TechApp（基于 react-router） 作为 /tech 子应用
const TechApp = lazy(() => import("./tech/main.jsx"));

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#2a2a2c",
      color: "#ffffff",
      fontSize: "1.2rem",
    }}
  >
    Loading...
  </div>
);

// Back button component
const BackButton = () => {
  return (
    <a
      href="/"
      className="fixed top-8 left-8 z-101 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 flex items-center gap-2 group"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="transform group-hover:-translate-x-1 transition-transform"
      >
        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
      </svg>
      Back to Home
    </a>
  );
};

function TechPage() {
  // 仍监听 popstate 以保持与主应用的行为一致（滚动到顶部等）
  useEffect(() => {
    const handleLocationChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#2a2a2c]">
      <BackButton />
      <Suspense fallback={<LoadingSpinner />}>
        <TechApp />
      </Suspense>
    </div>
  );
}

export default TechPage;

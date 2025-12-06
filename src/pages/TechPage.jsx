import { Suspense, lazy, useEffect } from "react";
import BackButton from "../components/ui/BackButton";
// import Navbar from "../components/ui/Navbar";

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
      <BackButton className="z-[101]" />
      {/* <Navbar isLoaded={true} /> */}
      <Suspense fallback={<LoadingSpinner />}>
        <TechApp />
      </Suspense>
    </div>
  );
}

export default TechPage;

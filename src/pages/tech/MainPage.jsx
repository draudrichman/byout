import { useRef, useState, memo } from 'react';
import HomePage from './HomePage.jsx';
import TechShowcasePage from './TechShowcasePage.jsx';
import InfiniteHero from '../../components/tech-components/ui/infinite-hero.jsx';
import '../../styles/tech/pages/MainPage.css';

const MainPage = () => {
  const techSectionRef = useRef(null);
  const [homeAnimationComplete, setHomeAnimationComplete] = useState(false);

  return (
    <div className="main-page">
      {/* 首页部分 */}
      <section className="homepage-section">
        <HomePage onAnimationComplete={setHomeAnimationComplete} />
      </section>

      {/* 技术展示页部分 */}
      <section className="tech-section" ref={techSectionRef}>
        <TechShowcasePage
          homeAnimationComplete={homeAnimationComplete}
        />
      </section>

      {/* 最终页面 - 3D动画背景  */}
      <section className="infinite-hero-section">
        <InfiniteHero />
      </section>
    </div>
  );
};

export default memo(MainPage);
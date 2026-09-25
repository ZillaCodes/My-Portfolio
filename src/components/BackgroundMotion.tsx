import { useEffect, useState } from 'react';

const panels = [
  ['panel panel--dashboard', '11%', '21%'], ['panel panel--module', '73%', '13%'],
  ['panel panel--mobile', '82%', '64%'], ['panel panel--chart', '18%', '76%'],
  ['bracket', '44%', '38%'], ['bracket bracket--right', '58%', '84%'],
];

/** Decorative, click-through product-system layer; the hero's Three scene remains independent. */
export default function BackgroundMotion() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setOffset(window.scrollY)); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(frame); };
  }, []);
  return <div className="background-motion" aria-hidden="true">
    <div className="system-grid system-grid--far" style={{ transform: `translateY(${offset * -.025}px)` }} />
    <svg className="system-paths" viewBox="0 0 1440 960" preserveAspectRatio="none">
      <path className="system-path" pathLength="1" d="M50 200H235L330 286H510" />
      <path className="system-path system-path--delayed" pathLength="1" d="M838 128H1080L1182 244H1370" />
      <path className="system-path" pathLength="1" d="M104 748H302L410 641H682L792 730" />
      <path className="system-path system-path--subtle" d="M694 458h172l74-76h194" />
      <circle className="system-flow" r="3" pathLength="1"><animateMotion dur="16s" repeatCount="indefinite" path="M50 200H235L330 286H510" /></circle>
      <circle className="system-flow system-flow--delayed" r="3" pathLength="1"><animateMotion dur="21s" repeatCount="indefinite" path="M104 748H302L410 641H682L792 730" /></circle>
    </svg>
    <div className="system-depth system-depth--middle" style={{ transform: `translateY(${offset * -.055}px)` }}>
      {panels.map(([className, left, top]) => <span key={`${className}-${left}`} className={`system-${className}`} style={{ left, top }} />)}
      <span className="system-node system-node--one" /><span className="system-node system-node--two" /><span className="system-node system-node--three" />
    </div>
    <div className="system-depth system-depth--close" style={{ transform: `translateY(${offset * -.09}px)` }}>
      <span className="system-window" /><span className="system-orbit" /><span className="system-scan" />
    </div>
  </div>;
}

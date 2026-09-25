type BackgroundElement = {
  left: string;
  top: string;
  type: 'node' | 'pulse' | 'path' | 'panel' | 'wireframe';
  delay: number;
  duration?: number;
};

const elements: BackgroundElement[] = [
  { left: '7%', top: '14%', type: 'node', delay: -4, duration: 25 },
  { left: '17%', top: '67%', type: 'path', delay: -11, duration: 32 },
  { left: '28%', top: '30%', type: 'panel', delay: -8, duration: 36 },
  { left: '38%', top: '83%', type: 'pulse', delay: -2, duration: 12 },
  { left: '47%', top: '16%', type: 'wireframe', delay: -18, duration: 42 },
  { left: '56%', top: '53%', type: 'node', delay: -13, duration: 29 },
  { left: '66%', top: '73%', type: 'panel', delay: -21, duration: 39 },
  { left: '74%', top: '23%', type: 'pulse', delay: -5, duration: 15 },
  { left: '83%', top: '57%', type: 'path', delay: -16, duration: 34 },
  { left: '91%', top: '85%', type: 'node', delay: -9, duration: 27 },
  { left: '12%', top: '90%', type: 'pulse', delay: -14, duration: 17 },
  { left: '34%', top: '8%', type: 'node', delay: -19, duration: 31 },
  { left: '93%', top: '37%', type: 'wireframe', delay: -7, duration: 44 },
];

/** A decorative, click-through AI product-building environment shared by public pages. */
export default function BackgroundMotion() {
  return <div className="background-motion" aria-hidden="true">
    {elements.map(({ left, top, type, delay, duration }) => (
      <span
        className={`background-motion__${type}`}
        key={`${type}-${left}-${top}`}
        style={{ left, top, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      />
    ))}
  </div>;
}

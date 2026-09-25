const particles = [
  ['8%', '13%', 'small'], ['19%', '67%', 'line'], ['28%', '31%', 'small'],
  ['39%', '82%', 'pulse'], ['48%', '17%', 'line'], ['57%', '52%', 'small'],
  ['66%', '74%', 'small'], ['74%', '24%', 'pulse'], ['84%', '58%', 'line'],
  ['92%', '86%', 'small'], ['12%', '91%', 'pulse'], ['35%', '9%', 'small'],
];

/** A decorative, click-through layer shared by the public portfolio pages. */
export default function BackgroundMotion() {
  return <div className="background-motion" aria-hidden="true">
    {particles.map(([left, top, type], index) => (
      <span
        className={`background-motion__${type}`}
        key={`${left}-${top}`}
        style={{ left, top, animationDelay: `${-index * 1.7}s` }}
      />
    ))}
  </div>;
}

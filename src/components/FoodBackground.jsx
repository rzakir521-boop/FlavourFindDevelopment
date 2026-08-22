const ICON_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function PizzaSlice(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M10 14 L54 10 Q58 10 56 14 L26 58 Q23 62 21 58 L10 18 Q9 15 10 14 Z" />
      <path d="M14 20 Q32 26 50 15" />
      <circle cx="26" cy="26" r="4" />
      <circle cx="34" cy="38" r="4" />
      <path d="M23 52 L20 58" />
    </svg>
  );
}

function NoodleBowl(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M6 30 Q6 52 32 52 Q58 52 58 30 Z" />
      <path d="M26 52 L24 57 H40 L38 52" />
      <path d="M18 28 Q22 16 16 6" />
      <path d="M32 26 Q36 12 28 2" />
      <path d="M46 28 Q50 16 44 6" />
      <path d="M42 18 L60 2" />
      <path d="M47 22 L64 6" />
    </svg>
  );
}

function Taco(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M4 32 Q10 6 32 6 Q54 6 60 32" />
      <path d="M8 30 Q12 26 16 30 Q20 26 24 30 Q28 26 32 30 Q36 26 40 30 Q44 26 48 30 Q52 26 56 30" />
      <path d="M6 32 Q32 44 58 32" />
      <path d="M22 34 L22 40" />
      <path d="M32 36 L32 42" />
      <path d="M42 34 L42 40" />
    </svg>
  );
}

function SushiSet(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <rect x="6" y="18" width="18" height="22" rx="9" />
      <path d="M15 18 L15 40" />
      <rect x="22" y="12" width="18" height="22" rx="9" />
      <path d="M31 12 L31 34" />
      <path d="M30 34 Q34 40 44 30 L58 16" />
      <path d="M34 38 Q38 44 48 34" />
      <path d="M16 44 Q16 52 26 52 Q36 52 36 44 Z" />
    </svg>
  );
}

function Burger(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M6 26 Q6 8 32 8 Q58 8 58 26 Z" />
      <circle cx="22" cy="16" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="32" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="42" cy="16" r="1.3" fill="currentColor" stroke="none" />
      <path d="M6 30 Q32 38 58 30" />
      <path d="M8 36 H56" />
      <path d="M8 44 H56" />
      <path d="M8 44 Q8 58 32 58 Q56 58 56 44 Z" />
    </svg>
  );
}

function Sandwich(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M10 30 L32 6 L54 30 Z" />
      <path d="M8 32 Q32 40 56 32" />
      <path d="M12 36 L34 58 L52 36 Z" />
    </svg>
  );
}

const ICONS = [
  { Icon: PizzaSlice, style: { top: "6%", left: "5%", width: 110, transform: "rotate(-8deg)" } },
  { Icon: NoodleBowl, style: { top: "8%", right: "8%", width: 140, transform: "rotate(4deg)" } },
  { Icon: Taco, style: { top: "44%", right: "3%", width: 120, transform: "rotate(-4deg)" } },
  { Icon: SushiSet, style: { bottom: "10%", left: "6%", width: 130, transform: "rotate(3deg)" } },
  { Icon: Burger, style: { bottom: "6%", left: "42%", width: 110, transform: "rotate(-3deg)" } },
  { Icon: Sandwich, style: { bottom: "12%", right: "20%", width: 110, transform: "rotate(6deg)" } },
];

export default function FoodBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden text-black/[0.08]" aria-hidden="true">
      {ICONS.map(({ Icon, style }, i) => (
        <Icon key={i} className="absolute" style={style} />
      ))}
    </div>
  );
}

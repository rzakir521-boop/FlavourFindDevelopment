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
      <path d="M10 14 L54 10 Q58 10 56 14 L27 53 Q24 57 22 53 L10 18 Q9 15 10 14 Z" />
      <path d="M14 20 Q32 26 50 15" />
      <circle cx="26" cy="26" r="4" />
      <circle cx="34" cy="38" r="4" />
      <path d="M20 51 Q22 55 18 58 Q13 56 15 51 Q17 49 20 51 Z" />
      <circle cx="9" cy="59" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function NoodleBowl(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M6 30 Q6 52 32 52 Q58 52 58 30 Z" />
      <path d="M26 52 L24 57 H40 L38 52" />
      <path d="M18 26 Q12 20 18 14 Q24 20 18 26 Z" />
      <path d="M30 24 Q24 16 31 10 Q38 16 30 24 Z" />
      <path d="M40 26 Q36 20 42 16 Q46 20 40 26 Z" />
      <path d="M40 18 L58 2" />
      <path d="M45 22 L62 6" />
    </svg>
  );
}

function Taco(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M2 30 Q8 10 24 8" opacity="0.6" />
      <path d="M10 32 Q16 8 36 8 Q56 8 60 32" />
      <path d="M14 30 Q18 26 22 30 Q26 26 30 30 Q34 26 38 30 Q42 26 46 30 Q50 26 54 30" />
      <path d="M16 28 Q36 38 56 28" />
      <path d="M12 32 Q36 44 58 32" />
      <path d="M26 32 L26 39" />
      <path d="M36 34 L36 41" />
      <path d="M46 32 L46 39" />
    </svg>
  );
}

function SushiSet(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <rect x="6" y="20" width="20" height="22" rx="10" />
      <path d="M11 24 L15 28" />
      <rect x="22" y="12" width="20" height="22" rx="10" />
      <path d="M27 16 L31 20" />
      <path d="M28 36 Q32 42 42 32 L58 16" />
      <path d="M32 40 Q36 46 46 36" />
      <path d="M16 46 Q16 54 26 54 Q36 54 36 46 Z" />
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
      <path d="M6 30 Q19 40 32 30 Q45 40 58 30" />
      <path d="M8 36 H56" />
      <path d="M8 44 H56" />
      <path d="M8 44 Q8 58 32 58 Q56 58 56 44 Z" />
    </svg>
  );
}

function Sandwich(props) {
  return (
    <svg viewBox="0 0 64 64" {...ICON_PROPS} {...props}>
      <path d="M8 28 L30 4 Q34 3 36 7 L52 28 Z" />
      <path d="M6 30 Q29 38 54 30" />
      <path d="M12 34 L36 58 L56 34 Z" />
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

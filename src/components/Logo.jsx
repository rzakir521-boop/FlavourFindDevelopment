import Link from "next/link";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: { box: "h-8 w-8", icon: 16, text: "text-lg" },
    md: { box: "h-10 w-10", icon: 20, text: "text-xl" },
    lg: { box: "h-14 w-14", icon: 28, text: "text-3xl" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div
        className={`${s.box} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB84D] via-[#FFA500] to-[#E69500] shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105`}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.6 2 4 5.6 4 10c0 5.2 6.4 11.2 7.3 12 .4.3.9.3 1.3 0C13.6 21.2 20 15.2 20 10c0-4.4-3.6-8-8-8zm0 11.5c-1.9 0-3.5-1.6-3.5-3.5S10.1 6.5 12 6.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill="white"/>
          <path d="M10.2 8.8c.2-.3.5-.4.8-.4.3 0 .6.1.8.4l.2.2.2-.2c.2-.3.5-.4.8-.4.3 0 .6.1.8.4.3.4.3 1 0 1.4l-1.4 1.5c-.2.2-.5.2-.7 0L10.2 10.2c-.3-.4-.3-1 0-1.4z" fill="#FFB84D"/>
        </svg>
      </div>
      <span className={`${s.text} font-display font-extrabold tracking-tight text-foreground`}>
        Flavour<span className="text-[#FFA500]">Find</span>
      </span>
    </Link>
  );
}

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo size="sm" />
          <p className="max-w-md text-center text-sm text-muted-foreground sm:text-right">
            AI-powered food discovery. Reducing decision fatigue, one craving at a time.
          </p>
        </div>
        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} FlavourFind. A preliminary prototype.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ArrowRight, MapPin, SlidersHorizontal, Wand2, ShieldCheck, Clock, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-60" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F2541B]/20 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F2541B]">
              <Sparkles className="h-4 w-4" />
              AI-powered food discovery
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-7xl" style={{ textWrap: "balance" }}>
              Find your perfect
              <span className="block bg-gradient-to-r from-[#FF6B2C] via-[#F2541B] to-[#E03A0E] bg-clip-text text-transparent">
                restaurant in seconds
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ textWrap: "balance" }}>
              Tell us your cravings, dietary needs and favourite cuisines. Our AI
              companion cuts through the noise and serves up venues that actually
              fit <em className="font-semibold not-italic text-foreground">you</em>.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/find"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#F2541B] px-7 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:brightness-105 active:scale-95 sm:w-auto"
              >
                <Wand2 className="h-5 w-5" />
                Find Food
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-base font-semibold text-foreground transition-all hover:border-foreground/30 sm:w-auto"
              >
                How it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Allergy-safe filtering
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#F2541B]" />
                Decisions in seconds, not minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                Inclusive of every diet
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three steps to your next meal
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              No more endless scrolling. Just tell us what you&apos;re craving and let the AI do the thinking.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                step: "01",
                title: "Set your location",
                desc: "Type your area or let us find you. We focus on what's actually nearby.",
              },
              {
                icon: SlidersHorizontal,
                step: "02",
                title: "Pick your preferences",
                desc: "Cravings, dietary needs, and cuisines — tap the tags that fit your mood.",
              },
              {
                icon: Sparkles,
                step: "03",
                title: "Discover venues",
                desc: "Get curated cards with match scores and a personal note on why each fits.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-secondary-foreground/15">
                  {s.step}
                </span>
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B2C] to-[#F2541B] text-white shadow-md shadow-orange-500/30">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/find"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-bold text-background transition-all hover:bg-[#F2541B] hover:text-white active:scale-95"
            >
              Try it now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

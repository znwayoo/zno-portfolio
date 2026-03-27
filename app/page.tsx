"use client";

import { Timeline } from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";

export default function Home() {
  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-[var(--container-padding)] max-w-[var(--container-max-w)] mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Profile Picture Placeholder */}
        <div className="relative w-48 h-64 mb-8 rounded-2xl overflow-hidden border-4 border-background shadow-xl hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/profile.png"
            alt="Zarni Nway Oo"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
          Zarni Nway Oo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium mb-4 max-w-2xl">
          Business Leader Turned Data Professional
        </p>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          Forbes 30 Under 30 Asia. MSc Business Analytics at UCD Smurfit. Bridging business strategy with data science to drive real-world transformation.
        </p>

        <div className="flex items-center gap-6 mb-12">
          <Link href="https://linkedin.com/in/zarninwayoo" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaLinkedinIn className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://github.com/znwayoo" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaGithub className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="mailto:znwayooo@gmail.com" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaEnvelope className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={scrollToTimeline}
          className="rounded-xl px-8 py-6 text-base font-medium hover:scale-105 transition-transform bg-secondary/50 backdrop-blur-md border border-foreground/10 hover:bg-secondary/80 text-foreground group"
        >
          More About Me
        </Button>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="w-full bg-secondary/30 border-t py-20">
        <Timeline />
      </section>
    </div>
  );
}

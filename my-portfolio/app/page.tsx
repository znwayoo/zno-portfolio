import { Timeline } from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function Home() {
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

        <h1 className="text-[var(--font-title)] font-bold leading-tight tracking-tight mb-6">
          Zarni Nway Oo
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8 max-w-2xl">
          Data Professional | Analytics Engineer
        </p>

        <div className="flex items-center gap-6 mb-12">
          <Link href="https://linkedin.com/in/" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://github.com/zarni-nway-oo" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <XIcon className="w-6 h-6" />
            <span className="sr-only">X (Twitter)</span>
          </Link>
          <Link href="mailto:example@example.com" className="p-3 bg-secondary rounded-xl hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>

        <Link href="#timeline">
          <Button size="lg" className="rounded-xl px-8 py-6 text-lg font-medium hover:scale-105 transition-transform">
            More About Me
          </Button>
        </Link>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="w-full bg-secondary/30 border-t py-20">
        <Timeline />
      </section>
    </div>
  );
}

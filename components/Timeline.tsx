"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Award, Code } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const milestones = [
    {
        year: "2013 - 2016",
        title: "Co-founded Ignite Technology Group",
        description: "Built Myanmar's first intercity bus ticketing platform, transforming manual booking into a nationwide digital network across 200+ retail partners.",
        icon: Rocket,
    },
    {
        year: "2016",
        title: "Forbes 30 Under 30 Asia",
        description: "Recognized for innovation in technology and business operations. Secured partnerships with major convenience store chains and trained 500+ staff on the digital platform.",
        icon: Award,
    },
    {
        year: "2016 - 2019",
        title: "Business Unit Head, IME International",
        description: <>Recruited by <Link href="https://imeinternational.com.mm" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">IME International Co., Ltd.</Link> to establish and lead the Agricultural Machinery Business Unit across a ~200-person nationwide operation spanning 12 locations, scaling to ~$10M revenue.</>,
        icon: Briefcase,
    },
    {
        year: "2022 - 2025",
        title: "BSc Computer System Engineering",
        description: "First Class Honours from University of Sunderland, London. Focused on AI, data structures, algorithms, and advanced data technology.",
        icon: Code,
    },
    {
        year: "2025 - 2026",
        title: "MSc Business Analytics",
        description: "Currently pursuing at UCD Michael Smurfit Graduate Business School, Dublin. Studying statistical methods, optimization, and decision analytics.",
        icon: GraduationCap,
    },
];

interface MilestonePosition {
    fillStart: number;
    fillEnd: number;
}

interface Milestone {
    year: string;
    title: string;
    description: React.ReactNode;
    icon: typeof Rocket;
}

interface TimelineMilestoneProps {
    milestone: Milestone;
    index: number;
    lineProgress: MotionValue<number>;
    position: MilestonePosition;
    iconRef: (el: HTMLDivElement | null) => void;
}

function TimelineMilestone({ milestone, index, lineProgress, position, iconRef }: TimelineMilestoneProps) {
    const Icon = milestone.icon;
    const isEven = index % 2 === 0;
    const { fillStart, fillEnd } = position;

    // Icon border fills top-to-bottom, perfectly synced with the blue line crossing it
    const clipPath = useTransform(lineProgress, (v) => {
        const range = fillEnd - fillStart;
        if (range <= 0) return "inset(0% 0% 100% 0%)";
        const progress = Math.min(1, Math.max(0, (v - fillStart) / range));
        return `inset(0% 0% ${(1 - progress) * 100}% 0%)`;
    });

    // Text fades in only AFTER the icon border is fully blue
    const textOpacity = useTransform(lineProgress, (v) => {
        return Math.min(1, Math.max(0, (v - fillEnd) / 0.03));
    });
    const textY = useTransform(lineProgress, (v) => {
        const progress = Math.min(1, Math.max(0, (v - fillEnd) / 0.03));
        return 20 * (1 - progress);
    });

    return (
        <div className="mb-24 last:mb-0 relative flex items-center md:justify-between flex-row">
            {/* Left content (desktop odd items) */}
            <div className={`hidden md:block w-5/12 ${!isEven ? "md:text-right pr-8" : "invisible"}`}>
                {!isEven && (
                    <motion.div style={{ opacity: textOpacity, y: textY }}>
                        <div className="text-blue-500 font-bold text-xl mb-1">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                    </motion.div>
                )}
            </div>

            {/* Icon - always visible, grey base + blue overlay that clips */}
            <div
                ref={iconRef}
                className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 z-10"
            >
                {/* Grey base - always visible */}
                <div className="absolute inset-0 rounded-xl bg-background border-2 border-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground/40" />
                </div>
                {/* Blue overlay - clips from top to bottom as line crosses this icon */}
                <motion.div
                    style={{ clipPath }}
                    className="absolute inset-0 rounded-xl bg-background border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                    <Icon className="w-5 h-5 text-blue-500" />
                </motion.div>
            </div>

            {/* Right content (desktop even items + mobile all) */}
            <div className={`w-full pl-14 md:pl-0 md:w-5/12 ${isEven ? "md:text-left md:pl-8" : "md:invisible"}`}>
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className={`${!isEven ? "md:hidden" : ""}`}
                >
                    <div className="text-blue-500 font-bold text-xl mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                </motion.div>
            </div>
        </div>
    );
}

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const milestoneAreaRef = useRef<HTMLDivElement>(null);
    const iconElsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Fallback positions before DOM measurement
    const fallback: MilestonePosition[] = milestones.map((_, i) => {
        const t = milestones.length === 1 ? 0.5 : i / (milestones.length - 1);
        return { fillStart: Math.max(0, t - 0.03), fillEnd: Math.min(1, t + 0.03) };
    });

    const [positions, setPositions] = useState<MilestonePosition[]>(fallback);

    // Measure actual icon positions in the DOM so fill is perfectly synced with the line
    const measure = useCallback(() => {
        const area = milestoneAreaRef.current;
        if (!area) return;
        const areaRect = area.getBoundingClientRect();
        if (areaRect.height === 0) return;

        const measured = iconElsRef.current.map((el) => {
            if (!el) return { fillStart: 0, fillEnd: 0 };
            const r = el.getBoundingClientRect();
            return {
                fillStart: (r.top - areaRect.top) / areaRect.height,
                fillEnd: (r.bottom - areaRect.top) / areaRect.height,
            };
        });
        setPositions(measured);
    }, []);

    useEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        if (milestoneAreaRef.current) ro.observe(milestoneAreaRef.current);
        return () => ro.disconnect();
    }, [measure]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end end"],
    });

    const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={containerRef}>
            <div className="relative max-w-3xl mx-auto pt-10 px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center text-foreground">
                    My Journey
                </h2>

                <div ref={milestoneAreaRef} className="relative">
                    {/* Grey track - always visible */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border/40 transform -translate-x-1/2" />

                    {/* Blue fill - grows with scroll, scaleY synced to lineProgress */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 overflow-hidden">
                        <motion.div
                            style={{ scaleY: lineProgress, transformOrigin: "top" }}
                            className="w-full h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        />
                    </div>

                    {milestones.map((milestone, index) => (
                        <TimelineMilestone
                            key={index}
                            milestone={milestone}
                            index={index}
                            lineProgress={lineProgress}
                            position={positions[index] || fallback[index]}
                            iconRef={(el) => { iconElsRef.current[index] = el; }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll spacer - guarantees enough scroll room for the line to reach the last icon */}
            <div className="h-[50vh]" aria-hidden="true" />
        </div>
    );
}

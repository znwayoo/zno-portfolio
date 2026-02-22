"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Database, Code } from "lucide-react";
import { useRef } from "react";

const milestones = [
    {
        year: "2024",
        title: "Senior Analytics Engineer",
        description: "Architecting modern data pipelines and building scalable analytics infrastructure for enterprise clients.",
        icon: Database,
    },
    {
        year: "2022",
        title: "Data Scientist",
        description: "Developed predictive models for customer churn and deployed them using MLflow and FastAPI.",
        icon: Code,
    },
    {
        year: "2020",
        title: "Data Analyst",
        description: "Created comprehensive Tableau dashboards to drive business decisions and increase retention.",
        icon: Briefcase,
    },
    {
        year: "2019",
        title: "MSc inside Data Science",
        description: "Graduated with honors, focusing on machine learning and big data analytics.",
        icon: GraduationCap,
    },
];

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    return (
        <div ref={containerRef} className="relative max-w-3xl mx-auto py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Career Outline</h2>

            <div className="relative">
                {/* Animated Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 overflow-hidden">
                    <motion.div
                        style={{ scaleY: pathLength, transformOrigin: "top" }}
                        className="w-full h-full bg-accent"
                    />
                </div>

                {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-16 relative flex items-center md:justify-between flex-row"
                        >
                            {/* Left Side Content (Empty for odd on desktop) */}
                            <div
                                className={`hidden md:block w-5/12 ${!isEven ? "md:text-right pr-8" : "invisible"
                                    }`}
                            >
                                {!isEven && (
                                    <>
                                        <div className="text-accent font-bold text-xl mb-1">{milestone.year}</div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                                        <p className="text-muted-foreground">{milestone.description}</p>
                                    </>
                                )}
                            </div>

                            {/* Center Icon */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-xl bg-background border-2 border-accent shadow-[0_0_15px_rgba(59,130,246,0.3)] z-10 transition-transform duration-300 hover:scale-110">
                                <Icon className="w-5 h-5 text-accent" />
                            </div>

                            {/* Right Side Content (Empty for even on desktop) */}
                            <div
                                className={`w-full pl-12 md:pl-0 md:w-5/12 ${isEven ? "md:text-left pl-8" : "md:invisible"
                                    }`}
                            >
                                {/* Always show content on mobile layout, toggle sides on desktop */}
                                <div className={`${!isEven ? "md:hidden" : ""}`}>
                                    <div className="text-accent font-bold text-xl mb-1">{milestone.year}</div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                                    <p className="text-muted-foreground">{milestone.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

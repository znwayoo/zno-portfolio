"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { InsightFrontmatter } from "@/lib/content";

interface InsightCardProps {
    insight: {
        slug: string;
        content: React.ReactNode;
        frontmatter: InsightFrontmatter;
    };
}

function InsightModalContent({ insight, onClose }: { insight: InsightCardProps["insight"]; onClose: () => void }) {
    const { title, excerpt, tags, date, readingTime } = insight.frontmatter;
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });

    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-hidden w-full h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
                layoutId={`insight-${insight.slug}`}
                className="relative w-full max-w-3xl h-full sm:h-[90vh] sm:my-[5vh] sm:rounded-2xl bg-background border shadow-2xl z-10 flex flex-col overflow-hidden"
            >
                {/* Header area with progress bar */}
                <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b">
                    <div className="flex justify-between items-center p-4 h-16">
                        <span className="font-medium truncate pr-4">{title}</span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-secondary transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Scroll Progress Bar */}
                    <motion.div
                        className="h-1 bg-accent origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>

                {/* Scrollable Content inside modal */}
                <div ref={scrollRef} className="overflow-y-auto w-full p-[var(--card-padding)] md:px-16 md:py-12">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            {date && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </div>
                            )}
                            {readingTime && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{readingTime}</span>
                                </div>
                            )}
                        </div>

                        <motion.h1 layoutId={`title-${insight.slug}`} className="text-4xl md:text-5xl font-bold mb-6">
                            {title}
                        </motion.h1>

                        <motion.p layoutId={`excerpt-${insight.slug}`} className="text-xl text-muted-foreground mb-8">
                            {excerpt}
                        </motion.p>

                        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
                            {tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-secondary text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none pb-20 mdx-content">
                        {insight.content}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function InsightCard({ insight }: InsightCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { title, excerpt, tags, date, readingTime, thumbnail } = insight.frontmatter;

    return (
        <>
            <motion.div
                layoutId={`insight-${insight.slug}`}
                onClick={() => setIsOpen(true)}
                className="w-full max-w-4xl mx-auto cursor-pointer group rounded-2xl overflow-hidden bg-card border shadow-sm transition-all duration-300 hover:shadow-[var(--shadow)] flex flex-col sm:flex-row"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {thumbnail && (
                    <div className="relative w-full sm:w-1/3 h-56 sm:h-auto overflow-hidden flex-shrink-0">
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            {date && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                </div>
                            )}
                            {readingTime && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{readingTime}</span>
                                </div>
                            )}
                        </div>
                        <motion.h2 layoutId={`title-${insight.slug}`} className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                            {title}
                        </motion.h2>
                        <motion.p layoutId={`excerpt-${insight.slug}`} className="text-muted-foreground mb-6 line-clamp-2">
                            {excerpt}
                        </motion.p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags?.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <InsightModalContent insight={insight} onClose={() => setIsOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/content";

interface ProjectCardProps {
    project: {
        slug: string;
        content: React.ReactNode;
        frontmatter: ProjectFrontmatter;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { title, excerpt, tags, thumbnail, githubUrl, liveUrl } = project.frontmatter;

    return (
        <>
            <motion.div
                onClick={() => setIsOpen(true)}
                className="w-full max-w-4xl mx-auto cursor-pointer group rounded-2xl overflow-hidden bg-card border shadow-sm transition-all duration-300 hover:shadow-[var(--shadow)] hover:border-blue-500/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative w-full aspect-video overflow-hidden bg-neutral-950">
                    <Image
                        src={thumbnail || "/images/placeholder.jpg"}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.75)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full z-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-3 text-white">
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-2">
                            {excerpt}
                        </p>
                    </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 bg-card/50 backdrop-blur-sm border-t flex flex-wrap gap-1.5 sm:gap-2">
                    {tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-secondary text-secondary-foreground text-xs sm:text-sm font-medium whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto w-full min-h-screen">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-4xl min-h-screen sm:min-h-0 sm:my-[3vh] md:my-[5vh] sm:rounded-2xl overflow-hidden bg-background border shadow-2xl z-10 flex flex-col"
                        >
                            <div className="sticky top-0 z-20 flex justify-between items-center p-3 sm:p-4 bg-background/80 backdrop-blur-md border-b">
                                <div className="flex gap-3 sm:gap-4">
                                    {githubUrl && (
                                        <Link href={githubUrl} target="_blank" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium hover:text-blue-500 transition-colors">
                                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="hidden sm:inline">Source Code</span>
                                        </Link>
                                    )}
                                    {liveUrl && (
                                        <Link href={liveUrl} target="_blank" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium hover:text-blue-500 transition-colors">
                                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="hidden sm:inline">Live Demo</span>
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-secondary transition-colors"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            <div className="relative w-full aspect-video flex-shrink-0 bg-neutral-950">
                                <Image
                                    src={thumbnail || "/images/placeholder.jpg"}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 896px"
                                    className="object-contain"
                                />
                            </div>

                            <div className="p-4 sm:p-8 md:px-16 md:py-12 bg-background flex-grow prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
                                    {title}
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-8">
                                    {excerpt}
                                </p>

                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-12">
                                    {tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg bg-secondary text-xs sm:text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mdx-content mt-4 sm:mt-8">
                                    {project.content}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

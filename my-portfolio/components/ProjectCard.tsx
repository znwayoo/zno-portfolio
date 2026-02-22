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
                layoutId={`card-${project.slug}`}
                onClick={() => setIsOpen(true)}
                className="w-full max-w-4xl mx-auto cursor-pointer group rounded-2xl overflow-hidden bg-card border shadow-sm transition-all duration-300 hover:shadow-[var(--shadow)] hover:border-accent/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative w-full h-80 sm:h-96 overflow-hidden">
                    <Image
                        src={thumbnail || "/images/placeholder.jpg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <motion.h2 layoutId={`title-${project.slug}`} className="text-3xl font-bold mb-3 text-white">
                            {title}
                        </motion.h2>
                        <motion.p layoutId={`excerpt-${project.slug}`} className="text-lg text-gray-200 line-clamp-2">
                            {excerpt}
                        </motion.p>
                    </div>
                </div>

                <div className="p-6 bg-card/50 backdrop-blur-sm border-t flex flex-wrap gap-2">
                    {tags?.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="h-10 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags && tags.length > 3 && (
                        <span className="h-10 px-4 py-2 rounded-xl bg-secondary/50 text-secondary-foreground text-sm font-medium">
                            +{tags.length - 3}
                        </span>
                    )}
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
                            layoutId={`card-${project.slug}`}
                            className="relative w-full max-w-4xl min-h-screen sm:min-h-[90vh] sm:my-[5vh] sm:rounded-2xl overflow-hidden bg-background border shadow-2xl z-10 flex flex-col"
                        >
                            <div className="sticky top-0 z-20 flex justify-between items-center p-4 bg-background/80 backdrop-blur-md border-b">
                                <div className="flex gap-4">
                                    {githubUrl && (
                                        <Link href={githubUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                                            <Github className="w-5 h-5" />
                                            <span className="hidden sm:inline">Source Code</span>
                                        </Link>
                                    )}
                                    {liveUrl && (
                                        <Link href={liveUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                            <span className="hidden sm:inline">Live Demo</span>
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-secondary transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="relative w-full h-64 sm:h-96 md:h-[400px] flex-shrink-0">
                                <Image
                                    src={thumbnail || "/images/placeholder.jpg"}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-[var(--card-padding)] md:px-16 md:py-12 bg-background flex-grow prose prose-lg dark:prose-invert max-w-none">
                                <motion.h1 layoutId={`title-${project.slug}`} className="text-4xl md:text-5xl font-bold mb-4">
                                    {title}
                                </motion.h1>
                                <motion.p layoutId={`excerpt-${project.slug}`} className="text-xl text-muted-foreground mb-8">
                                    {excerpt}
                                </motion.p>

                                <div className="flex flex-wrap gap-2 mb-12">
                                    {tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mdx-content mt-8">
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

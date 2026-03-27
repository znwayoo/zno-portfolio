"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { X, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { BlogFrontmatter } from "@/lib/content";

interface BlogCardProps {
    post: {
        slug: string;
        content: React.ReactNode;
        frontmatter: BlogFrontmatter;
    };
}

function BlogModalContent({ post, onClose }: { post: BlogCardProps["post"]; onClose: () => void }) {
    const { title, excerpt, tags, date, readingTime } = post.frontmatter;
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
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-3xl h-full sm:h-[90vh] sm:my-[5vh] sm:rounded-2xl bg-background border shadow-2xl z-10 flex flex-col overflow-hidden"
            >
                <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b">
                    <div className="flex justify-between items-center p-3 sm:p-4 h-12 sm:h-16">
                        <span className="font-medium truncate pr-4 text-sm sm:text-base">{title}</span>
                        <button
                            onClick={onClose}
                            className="p-1.5 sm:p-2 rounded-xl hover:bg-secondary transition-colors"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                    <motion.div
                        className="h-1 bg-blue-500 origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>

                <div ref={scrollRef} className="overflow-y-auto w-full p-4 sm:p-8 md:px-16 md:py-12">
                    <div className="mb-8 sm:mb-12">
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                            {date && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </div>
                            )}
                            {readingTime && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{readingTime}</span>
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                            {title}
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">
                            {excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b">
                            {tags?.map((tag) => (
                                <span key={tag} className="px-2.5 py-1 sm:px-3 rounded-lg bg-secondary text-xs sm:text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none pb-20 mdx-content">
                        {post.content}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function BlogCard({ post }: BlogCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { title, excerpt, tags, date, readingTime, thumbnail } = post.frontmatter;

    return (
        <>
            <motion.div
                onClick={() => setIsOpen(true)}
                className="w-full max-w-4xl mx-auto cursor-pointer group rounded-2xl overflow-hidden bg-card border shadow-sm transition-all duration-300 hover:shadow-[var(--shadow)] flex flex-col sm:flex-row"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {thumbnail && (
                    <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden flex-shrink-0">
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 100vw, 40vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                            {date && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                </div>
                            )}
                            {readingTime && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{readingTime}</span>
                                </div>
                            )}
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-2">
                            {excerpt}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {tags?.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <BlogModalContent post={post} onClose={() => setIsOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

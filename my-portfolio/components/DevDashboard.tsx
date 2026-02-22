"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FileText, Image as ImageIcon } from "lucide-react";

interface DevDashboardProps {
    initialFiles: {
        projects: { slug: string; title: string }[];
        insights: { slug: string; title: string }[];
    };
}

export function DevDashboard({ initialFiles }: DevDashboardProps) {
    const [title, setTitle] = useState("New Markdown File");
    const [tags, setTags] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const editor = useEditor({
        extensions: [StarterKit],
        content: `
## Example Content
Start typing your markdown contents here...

- Item 1
- Item 2
    `,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[500px]",
            },
        },
    });

    const handleDownload = () => {
        // Generate Frontmatter
        const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${new Date().toISOString().split("T")[0]}"
tags: [${tags.split(",").map(t => `"${t.trim()}"`).join(", ")}]
thumbnail: "${thumbnail}"
---

`;

        const content = editor?.getText() || "";
        const fullContent = frontmatter + content;

        const blob = new Blob([fullContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
            {/* 1/3 Left Panel - File Tree & Frontmatter */}
            <div className="w-1/3 border-r overflow-y-auto bg-card/30 p-6 flex flex-col gap-8">
                <div>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        File Tree
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">/content/projects</h3>
                            <ul className="space-y-1 text-sm pl-4 border-l">
                                {initialFiles.projects.map((p) => (
                                    <li key={p.slug} className="text-muted-foreground hover:text-accent cursor-pointer truncate">
                                        {p.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">/content/insights</h3>
                            <ul className="space-y-1 text-sm pl-4 border-l">
                                {initialFiles.insights.map((i) => (
                                    <li key={i.slug} className="text-muted-foreground hover:text-accent cursor-pointer truncate">
                                        {i.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                    <h2 className="text-lg font-bold mb-4">Frontmatter Editor</h2>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Title</label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Excerpt</label>
                        <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Tags (comma separated)</label>
                        <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Node, etc." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Thumbnail URL</label>
                        <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="/images/thumb.jpg" />
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-dashed text-center">
                        <ImageIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                        <p>Drag & Drop Images here to place them into /public/images/ not fully supported in static browser</p>
                    </div>

                    <Button onClick={handleDownload} className="w-full gap-2">
                        <Download className="w-4 h-4" />
                        Download MDX
                    </Button>
                </div>
            </div>

            {/* 2/3 Middle & Right - Editor & Preview */}
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x overflow-hidden">
                {/* Editor */}
                <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
                    <div className="p-3 border-b bg-card/50 text-sm font-medium sticky top-0 z-10">Tiptap Editor</div>
                    <div className="flex-1 overflow-y-auto p-8 prose-container">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Live Preview Pane */}
                <div className="flex-1 flex flex-col h-full bg-secondary/10 overflow-hidden relative">
                    <div className="p-3 border-b bg-card/50 text-sm font-medium sticky top-0 z-10 flex justify-between items-center">
                        <span>Live Preview</span>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded">Read-only HTML</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8">
                        <div
                            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

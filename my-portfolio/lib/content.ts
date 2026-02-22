import fs from "fs";
import path from "path";
import { parseMdx } from "./mdx";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BaseFrontmatter {
    title: string;
    excerpt: string;
    date?: string;
    tags?: string[];
    thumbnail?: string;
}

export interface ProjectFrontmatter extends BaseFrontmatter {
    githubUrl?: string;
    liveUrl?: string;
    techStack?: string[];
}

export interface InsightFrontmatter extends BaseFrontmatter {
    readingTime?: string;
}

function getContentTypePath(type: "projects" | "insights") {
    return path.join(CONTENT_DIR, type);
}

export async function getFiles(type: "projects" | "insights") {
    const dirPath = getContentTypePath(type);
    if (!fs.existsSync(dirPath)) {
        return [];
    }
    return fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export async function getFileBySlug<T = BaseFrontmatter>(type: "projects" | "insights", slug: string) {
    const dirPath = getContentTypePath(type);

    // Support both .mdx and .md extensions
    let filePath = path.join(dirPath, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(dirPath, `${slug}.md`);
    }

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { content, frontmatter } = await parseMdx<T>(rawContent);

    return {
        slug,
        content,
        frontmatter,
    };
}

export async function getAllContent<T extends BaseFrontmatter>(type: "projects" | "insights") {
    const files = await getFiles(type);

    const entries = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx?$/, "");
            const data = await getFileBySlug<T>(type, slug);
            return data;
        })
    );

    return entries
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
        .sort((a, b) => {
            // Sort by date if available, newest first
            if (a.frontmatter.date && b.frontmatter.date) {
                return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
            }
            return 0;
        });
}

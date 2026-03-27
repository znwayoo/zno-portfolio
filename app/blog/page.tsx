import { getAllContent, BlogFrontmatter } from "@/lib/content";
import { BlogCard } from "@/components/BlogCard";

export const metadata = {
    title: "Blog",
    description: "Writing and thoughts on data, analytics, policy, and AI.",
};

export default async function BlogPage() {
    const posts = await getAllContent<BlogFrontmatter>("blog");

    return (
        <div className="container max-w-[var(--container-max-w)] mx-auto px-[var(--container-padding)] py-16">
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
                <p className="text-xl text-muted-foreground">
                    Thoughts, analysis, and perspectives on data, policy, and technology.
                </p>
            </div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                    <p>No posts found. Check back later!</p>
                </div>
            )}
        </div>
    );
}

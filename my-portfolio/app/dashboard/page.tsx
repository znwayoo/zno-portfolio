import { getAllContent } from "@/lib/content";
import { DevDashboard } from "@/components/DevDashboard";

export const metadata = {
    title: "Dashboard",
    robots: "noindex, nofollow", // Prevent indexing of dev dashboard
};

export default async function DashboardPage() {
    // Client side env variable can be checked at build/runtime
    if (process.env.NEXT_PUBLIC_DEV_ONLY !== "true") {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <h1 className="text-4xl font-bold text-destructive">403 Forbidden</h1>
                <p className="text-muted-foreground">This page is disabled in production.</p>
            </div>
        );
    }

    // Load existing files so the editor can show a tree (build-time read)
    const projects = await getAllContent("projects");
    const insights = await getAllContent("insights");

    // Format explicitly for the client component
    const fileTree = {
        projects: projects.map((p) => ({ slug: p.slug, title: p.frontmatter.title })),
        insights: insights.map((i) => ({ slug: i.slug, title: i.frontmatter.title })),
    };

    return <DevDashboard initialFiles={fileTree} />;
}

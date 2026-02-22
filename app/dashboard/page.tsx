import { getAllContent } from "@/lib/content";
import { DevDashboard } from "@/components/DevDashboard";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Dashboard",
    robots: "noindex, nofollow", // Prevent indexing of dev dashboard
};

export default async function DashboardPage() {
    // Client side env variable can be checked at build/runtime
    if (process.env.NEXT_PUBLIC_DEV_ONLY !== "true" || process.env.NODE_ENV === "production") {
        notFound();
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

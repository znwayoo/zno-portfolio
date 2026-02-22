import { getAllContent, InsightFrontmatter } from "@/lib/content";
import { InsightCard } from "@/components/InsightCard";

export const metadata = {
    title: "Insights",
    description: "Writing and thoughts on data engineering, machine learning, and AI.",
};

export default async function InsightsPage() {
    const insights = await getAllContent<InsightFrontmatter>("insights");

    return (
        <div className="container max-w-[var(--container-max-w)] mx-auto px-[var(--container-padding)] py-16">
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights</h1>
                <p className="text-xl text-muted-foreground">
                    Thoughts, tutorials, and perspectives on the modern data stack.
                </p>
            </div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                {insights.map((insight) => (
                    <InsightCard key={insight.slug} insight={insight} />
                ))}
            </div>

            {insights.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                    <p>No insights found. Check back later!</p>
                </div>
            )}
        </div>
    );
}

import { getAllContent, ProjectFrontmatter } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
    title: "Projects",
    description: "A showcase of my recent work in data analytics and engineering.",
};

export default async function ProjectsPage() {
    const projects = await getAllContent<ProjectFrontmatter>("projects");

    return (
        <div className="container max-w-[var(--container-max-w)] mx-auto px-[var(--container-padding)] py-16">
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
                <p className="text-xl text-muted-foreground">
                    A selection of projects where I transform raw data into actionable business value.
                </p>
            </div>

            <div className="flex flex-col gap-12 sm:gap-16">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                    <p>No projects found. Create some in the dashboard or via MDX!</p>
                </div>
            )}
        </div>
    );
}

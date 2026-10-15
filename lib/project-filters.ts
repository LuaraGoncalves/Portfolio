import type { PortfolioProject } from "@/lib/portfolio";

export type ProjectFilter = "all" | "web" | "development" | "graphic" | "wordpress" | "copywriting";

export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "Todos" }, { id: "web", label: "Web Design" },
  { id: "development", label: "Development" }, { id: "graphic", label: "Graphic Design" },
  { id: "wordpress", label: "WordPress" }, { id: "copywriting", label: "Copywriting" }
];

const filterTerms: Record<Exclude<ProjectFilter, "all">, string[]> = {
  web: ["web", "front", "react", "next", "vue", "typescript", "javascript", "html", "css"],
  development: ["development", "back", "c#", ".net", "asp.net", "java", "spring", "python", "node", "api", "rest"],
  graphic: ["graphic", "figma", "illustration", "branding"],
  wordpress: ["wordpress"], copywriting: ["copywriting", "content writing"]
};

export function matchesProjectFilter(project: PortfolioProject, filter: ProjectFilter) {
  return filter === "all" || project.techs.some((tech) =>
    filterTerms[filter].some((term) => tech.toLowerCase().includes(term))
  );
}

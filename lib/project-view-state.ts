import type { PortfolioProject } from "@/lib/portfolio";

export type ProjectViewState = "loading" | "error" | "empty" | "ready";

export function getProjectViewState(projects: PortfolioProject[] | null, loading: boolean): ProjectViewState {
  if (loading) return "loading";
  if (projects === null) return "error";
  return projects.length === 0 ? "empty" : "ready";
}

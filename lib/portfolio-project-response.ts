import type { PortfolioProject } from "@/lib/portfolio";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isOptionalString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isPortfolioProject(value: unknown): value is PortfolioProject {
  if (typeof value !== "object" || value === null) return false;
  const project = value as Record<string, unknown>;
  return typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.image === "string" &&
    typeof project.description === "string" &&
    isStringArray(project.techs) &&
    typeof project.githubUrl === "string" &&
    isOptionalString(project.demoUrl) &&
    typeof project.status === "string" &&
    isOptionalString(project.imagePosition) &&
    isStringArray(project.screenshots) &&
    isOptionalString(project.demoVideoUrl);
}

export function parseProjectsResponse(ok: boolean, payload: unknown): PortfolioProject[] | null {
  if (!ok || !Array.isArray(payload) || !payload.every(isPortfolioProject)) return null;
  return payload;
}

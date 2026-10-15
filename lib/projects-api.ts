import type { PortfolioProject } from "@/lib/portfolio";
import { parseProjectsResponse } from "@/lib/portfolio-project-response";

/** Loads project records on the Next.js server, so they are in the first HTML response. */
export async function getPortfolioProjects(): Promise<PortfolioProject[] | null> {
  const backendUrl = process.env.BACKEND_API_URL ?? "http://localhost:5080";

  try {
    const response = await fetch(`${backendUrl}/api/v1/projects`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    const data: unknown = await response.json();
    return parseProjectsResponse(response.ok, data);
  } catch {
    return null;
  }
}

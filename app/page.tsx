import PortfolioHome from "@/components/portfolio-home";
import { getPortfolioProjects } from "@/lib/projects-api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getPortfolioProjects();
  return <PortfolioHome initialProjects={projects} />;
}

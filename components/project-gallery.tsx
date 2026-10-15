"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Code2, ExternalLink, Github, RefreshCw } from "lucide-react";

import { profile, type PortfolioProject } from "@/lib/portfolio";
import { matchesProjectFilter, projectFilters, type ProjectFilter } from "@/lib/project-filters";
import { parseProjectsResponse } from "@/lib/portfolio-project-response";
import { getProjectViewState } from "@/lib/project-view-state";
import styles from "./portfolio-home.module.css";

function videoEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      if (url.pathname === "/watch" && url.searchParams.has("v")) return `https://www.youtube-nocookie.com/embed/${url.searchParams.get("v")}`;
      if (url.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${url.pathname}`;
    }
    if (url.hostname === "vimeo.com") return `https://player.vimeo.com/video/${url.pathname.split("/").filter(Boolean).at(-1)}`;
  } catch { /* External links are shown as links when they are not supported video providers. */ }
  return null;
}

export function ProjectGallery({ initialProjects }: { initialProjects: PortfolioProject[] | null }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("web");
  const [loading, setLoading] = useState(false);
  const visibleProjects = useMemo(() => projects?.filter((project) => matchesProjectFilter(project, activeFilter)) ?? [], [projects, activeFilter]);
  const state = getProjectViewState(projects, loading);

  async function reloadProjects() {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/projects", { cache: "no-store" });
      if (!response.ok) throw new Error("A API respondeu com erro.");
      const result: unknown = await response.json();
      const parsed = parseProjectsResponse(response.ok, result);
      if (parsed === null) throw new Error("A API retornou um formato inesperado.");
      setProjects(parsed);
    } catch {
      setProjects(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-labelledby="portfolio-title" className={styles.portfolio} id="portfolio">
      <div className={styles.wrap}>
        <h2 className={styles.sectionTitle} id="portfolio-title">Portfolio</h2>
        <div className={styles.portfolioLayout}>
          <div aria-label="Filtrar projetos" className={styles.filters} role="group">
            {projectFilters.map(({ id, label }) => (
              <button aria-pressed={activeFilter === id} className={activeFilter === id ? styles.activeFilter : undefined} key={id} onClick={() => setActiveFilter(id)} type="button">{label}</button>
            ))}
          </div>
          <div aria-live="polite" className={styles.projects}>
            {state === "loading" ? (
              <div className={styles.projectMessage}><RefreshCw aria-hidden="true" className={styles.spinner} /><p role="status">Buscando projetos no servidor…</p></div>
            ) : state === "error" ? (
              <div className={styles.projectMessage}>
                <RefreshCw aria-hidden="true" />
                <p role="status">Não consegui buscar os projetos no servidor. Confira se a API e o banco estão ativos.</p>
                <button className={styles.retry} disabled={loading} onClick={reloadProjects} type="button">{loading ? "Buscando…" : "Tentar novamente"}</button>
              </div>
            ) : visibleProjects.length ? (
              visibleProjects.map((project) => <ProjectCard key={project.id || project.title} project={project} />)
            ) : state === "empty" ? (
              <div className={styles.projectMessage}>
                <Code2 aria-hidden="true" />
                <p>Ainda não há projetos publicados. Veja os repositórios reais no GitHub.</p>
                <Link href={profile.githubUrl} rel="noreferrer" target="_blank">Abrir GitHub</Link>
              </div>
            ) : (
              <div className={styles.projectMessage}>
                <Code2 aria-hidden="true" />
                <p>Nenhum projeto nesta categoria. Escolha outro filtro para ver os projetos publicados.</p>
                <button className={styles.retry} onClick={() => setActiveFilter("all")} type="button">Ver todos</button>
              </div>
            )}
          </div>
        </div>
        <p aria-hidden="true" className={styles.portfolioNote}>— &nbsp; • • • &nbsp; —</p>
      </div>
      <span aria-hidden="true" className={styles.sideLabel}>PORTFÓLIO</span>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const videoUrl = project.demoVideoUrl ? videoEmbedUrl(project.demoVideoUrl) : null;
  const hasMedia = project.screenshots.length > 0 || Boolean(project.demoVideoUrl);

  return (
    <article className={styles.project}>
      {project.image ? <Image alt={`Prévia do projeto ${project.title}`} className={styles.projectImage} fill priority sizes="(min-width: 900px) 220px, (min-width: 640px) 30vw, 42vw" src={project.image} style={{ objectPosition: project.imagePosition ?? "center" }} /> : null}
      <div className={styles.projectDetails}>
        <span className={styles.projectStatus}>{project.status}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul aria-label="Tecnologias" className={styles.projectTechs}>{project.techs.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <div className={styles.projectLinks}>
          {project.githubUrl && <Link href={project.githubUrl} rel="noreferrer" target="_blank"><Github aria-hidden="true" />Ver código</Link>}
          {project.demoUrl && <Link href={project.demoUrl} rel="noreferrer" target="_blank"><ExternalLink aria-hidden="true" />Ver site</Link>}
        </div>
      </div>
      {hasMedia && (
        <details className={styles.projectMedia}>
          <summary>Ver capturas e demonstração</summary>
          {project.screenshots.length > 0 && (
            <div aria-label={`Capturas de tela de ${project.title}`} className={styles.screenshotGallery}>
              {project.screenshots.map((image, index) => <a href={image} key={image} rel="noreferrer" target="_blank"><Image alt={`${project.title}: captura de tela ${index + 1}`} height={160} src={image} width={280} /></a>)}
            </div>
          )}
          {project.demoVideoUrl && (videoUrl ? (
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" src={videoUrl} title={`Demonstração do projeto ${project.title}`} />
          ) : (
            <a href={project.demoVideoUrl} rel="noreferrer" target="_blank">Assistir à demonstração em vídeo</a>
          ))}
        </details>
      )}
    </article>
  );
}

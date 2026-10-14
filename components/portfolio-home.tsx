"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUp,
  Code2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  RefreshCw,
  Send,
  Server,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { architecturePractices, profile, skillGroups, type PortfolioProject } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

type ProjectFilter = "all" | "web" | "development" | "graphic" | "wordpress" | "copywriting";

const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Design" },
  { id: "development", label: "Development" },
  { id: "graphic", label: "Graphic Design" },
  { id: "wordpress", label: "WordPress" },
  { id: "copywriting", label: "Copywriting" },
];

const filterTerms: Record<Exclude<ProjectFilter, "all">, string[]> = {
  web: ["web", "front", "react", "next", "vue", "typescript", "javascript", "html", "css"],
  development: ["development", "back", "c#", ".net", "asp.net", "java", "spring", "python", "node", "api", "rest"],
  graphic: ["graphic", "figma", "illustration", "branding"],
  wordpress: ["wordpress"],
  copywriting: ["copywriting", "content writing"],
};

function matchesFilter(project: PortfolioProject, filter: ProjectFilter) {
  return filter === "all" || project.techs.some((tech) =>
    filterTerms[filter].some((term) => tech.toLowerCase().includes(term)),
  );
}

export default function PortfolioHome() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [projectsStatus, setProjectsStatus] = useState<"loading" | "ready" | "error">("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("web");
  const [contactStatus, setContactStatus] = useState("");
  const [portraitUnavailable, setPortraitUnavailable] = useState(false);
  const visibleProjects = projects.filter((project) => matchesFilter(project, activeFilter));

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setProjectsStatus("loading");
      try {
        const response = await fetch("/api/v1/projects", { signal: controller.signal });
        if (!response.ok) throw new Error("A API não respondeu com sucesso.");
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("A resposta da API não é uma lista.");
        setProjects(data as PortfolioProject[]);
        setProjectsStatus("ready");
      } catch {
        if (!controller.signal.aborted) setProjectsStatus("error");
      }
    }

    void loadProjects();
    return () => controller.abort();
  }, [reloadKey]);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Contato pelo portfólio — ${formData.get("name")}`;
    const body = [
      `Nome: ${formData.get("name")}`,
      `E-mail: ${formData.get("email")}`,
      "",
      String(formData.get("message")),
    ].join("\n");

    setContactStatus("Seu aplicativo de e-mail deve abrir para concluir o envio.");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#conteudo">Pular para o conteúdo</a>

      <header className={`${styles.wrap} ${styles.header}`} id="home">
        <Link aria-label={`${profile.name}, página inicial`} className={styles.logo} href="#home">
          {profile.name.toUpperCase()}
        </Link>
        <ThemeToggle />
        <nav aria-label="Navegação principal" className={styles.nav}>
          <Link href="#home">INÍCIO</Link>
          <Link href="#about">SOBRE</Link>
          <Link href="#portfolio">PORTFÓLIO</Link>
          <Link className={styles.navContact} href="#contact">CONTATO</Link>
        </nav>
      </header>

      <section aria-labelledby="hero-title" className={`${styles.wrap} ${styles.hero}`} id="conteudo">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Olá, meu nome é</p>
          <h1 id="hero-title">{profile.fullName}</h1>
          <span className={styles.role}>{profile.role}</span>
          <p className={styles.intro}>
            Desenvolvo soluções digitais do frontend ao backend. Transformo ideias em aplicações claras,
            acessíveis e confiáveis, com foco em C#, .NET e APIs.
          </p>
          <div className={styles.heroLinks}>
            <Link href="#portfolio"><Code2 aria-hidden="true" /> Ver projetos</Link>
            <Link href={`mailto:${profile.email}`}><Mail aria-hidden="true" /> Entre em contato</Link>
          </div>
        </div>
        <div className={styles.portraitArea}>
          <div className={styles.portrait}>
            {portraitUnavailable ? (
              <span aria-label={`Iniciais de ${profile.fullName}`} role="img">{profile.name.slice(0, 2).toUpperCase()}</span>
            ) : (
              <Image
                alt={`Foto de ${profile.fullName}`}
                className={styles.portraitPhoto}
                fill
                onError={() => setPortraitUnavailable(true)}
                priority
                sizes="(max-width: 700px) 150px, 194px"
                src={profile.photoUrl}
              />
            )}
          </div>
          <p className={styles.location}><MapPin aria-hidden="true" /> {profile.location} · Disponível para projetos</p>
        </div>
      </section>

      <section aria-labelledby="about-title" className={styles.about} id="about">
        <div className={styles.wrap}>
          <h2 id="about-title">Sobre mim</h2>
          <p className={styles.subtitle}>{profile.role} · estudante de Análise e Desenvolvimento de Sistemas</p>
          <p className={styles.bio}>
            Sou apaixonada por desenvolvimento de software, boas práticas e aprendizado contínuo.
            Tenho foco em C#, ASP.NET Core, APIs REST, bancos relacionais e integração entre sistemas.
            Também construo interfaces web com React, Next.js e Vue.js.
          </p>

          <h3 className={styles.skillsTitle}>Tecnologias</h3>
          <div className={styles.skills} id="habilidades">
            {skillGroups.flatMap((group) => group.items).map((skill, index) => (
              <div className={styles.skill} key={skill}>
                <span aria-hidden="true">{index < 4 ? <Server /> : <Code2 />}</span>{skill}
              </div>
            ))}
          </div>
          <div className={styles.practices}>
            <h3>Práticas de engenharia</h3>
            <ul>{architecturePractices.map(({ label }) => <li key={label}>{label}</li>)}</ul>
          </div>
        </div>
        <span aria-hidden="true" className={styles.sideLabel}>SOBRE MIM</span>
      </section>

      <section aria-labelledby="portfolio-title" className={styles.portfolio} id="portfolio">
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle} id="portfolio-title">Portfolio</h2>
          <div className={styles.portfolioLayout}>
            <div aria-label="Filtrar projetos" className={styles.filters} role="group">
              {projectFilters.map(({ id, label }) => (
                <button
                  aria-pressed={activeFilter === id}
                  className={activeFilter === id ? styles.activeFilter : undefined}
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  type="button"
                >{label}</button>
              ))}
            </div>

            <div aria-live="polite" className={styles.projects}>
              {projectsStatus === "loading" ? (
                <div className={styles.projectMessage}><RefreshCw aria-hidden="true" className={styles.spinner} />Carregando projetos pela API .NET…</div>
              ) : projectsStatus === "error" ? (
                <div className={styles.projectMessage}>
                  <p role="status">Não consegui carregar os projetos. Verifique se a API está ativa.</p>
                  <button className={styles.retry} onClick={() => setReloadKey((key) => key + 1)} type="button">Tentar novamente</button>
                </div>
              ) : visibleProjects.length ? (
                visibleProjects.map((project) => <ProjectCard key={project.title} project={project} />)
              ) : projects.length === 0 ? (
                Array.from({ length: 6 }, (_, index) => (
                  <article aria-label={`Espaço reservado para projeto ${index + 1}`} className={styles.projectPlaceholder} key={`placeholder-${index}`}>
                    Projeto {String(index + 1).padStart(2, "0")}
                  </article>
                ))
              ) : (
                <div className={styles.projectMessage}>
                  <Code2 aria-hidden="true" />
                  <p>Ainda não há projetos publicados na API.</p>
                  <Link href={profile.githubUrl} rel="noreferrer" target="_blank">Veja meus repositórios no GitHub</Link>
                </div>
              )}
            </div>
          </div>
          <p aria-hidden="true" className={styles.portfolioNote}>— &nbsp; • • • &nbsp; —</p>
        </div>
        <span aria-hidden="true" className={styles.sideLabel}>PORTFÓLIO</span>
      </section>

      <section aria-labelledby="contact-title" className={styles.contact} id="contact">
        <div className={styles.wrap}>
          <h2 className={styles.sectionTitle} id="contact-title">Entre em contato</h2>
          <div className={styles.contactCard}>
            <div className={styles.contactInfo}>
              <h3>Informações de contato</h3>
              <Link className={styles.infoRow} href={`mailto:${profile.email}`}><Mail aria-hidden="true" />{profile.email}</Link>
              <p className={styles.infoRow}><MapPin aria-hidden="true" />Disponível para trabalho remoto · {profile.location}</p>

              <h3 className={styles.socialTitle}>Redes profissionais</h3>
              <div className={styles.socialLinks}>
                <Link href={profile.githubUrl} rel="noreferrer" target="_blank"><Github aria-hidden="true" />GitHub</Link>
                <Link href={profile.linkedinUrl} rel="noreferrer" target="_blank"><Linkedin aria-hidden="true" />LinkedIn</Link>
              </div>
            </div>

            <form className={styles.contactForm} onSubmit={handleContactSubmit}>
              <label className={styles.srOnly} htmlFor="contact-name">Seu nome</label>
              <input autoComplete="name" id="contact-name" maxLength={100} name="name" placeholder="Seu nome" required />
              <label className={styles.srOnly} htmlFor="contact-email">Seu e-mail</label>
              <input autoComplete="email" id="contact-email" maxLength={254} name="email" placeholder="Seu e-mail" required type="email" />
              <label className={styles.srOnly} htmlFor="contact-message">Sua mensagem</label>
              <textarea id="contact-message" maxLength={5000} name="message" placeholder="Sua mensagem" required />
              <button className={styles.send} type="submit"><Send aria-hidden="true" />Enviar mensagem</button>
              <p aria-live="polite" className={styles.formStatus} role="status">{contactStatus}</p>
            </form>
          </div>
        </div>
        <span aria-hidden="true" className={styles.sideLabel}>CONTATO</span>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerContent}`}>
          <Link className={styles.logo} href="#home">{profile.name.toUpperCase()}</Link>
          <span className={styles.copyright}>© {new Date().getFullYear()} {profile.fullName}<br />Todos os direitos reservados.</span>
          <nav aria-label="Links do rodapé" className={styles.footerLinks}>
            <Link href="#home">INÍCIO</Link><Link href="#about">SOBRE</Link><Link href="#portfolio">PORTFÓLIO</Link><Link href="#contact">CONTATO</Link>
          </nav>
        </div>
      </footer>

      <Link aria-label="Voltar ao início" className={styles.backTop} href="#home"><ArrowUp aria-hidden="true" /></Link>
      <WhatsAppFloat />
    </main>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className={styles.project}>
      {project.image ? <Image alt={`Imagem do projeto ${project.title}`} className={styles.projectImage} fill sizes="(min-width: 900px) 220px, (min-width: 640px) 30vw, 42vw" src={project.image} /> : null}
      <div className={styles.projectDetails}>
        <span className={styles.projectStatus}>{project.status}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul aria-label="Tecnologias" className={styles.projectTechs}>{project.techs.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <div className={styles.projectLinks}>
          {project.githubUrl && <Link href={project.githubUrl} rel="noreferrer" target="_blank"><Github aria-hidden="true" />Código</Link>}
          {project.demoUrl && <Link href={project.demoUrl} rel="noreferrer" target="_blank">Demonstração</Link>}
        </div>
      </div>
    </article>
  );
}

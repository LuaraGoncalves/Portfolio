"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  architecturePractices,
  navItems,
  profile,
  skillGroups,
  stats,
  timeline
} from "@/lib/portfolio";
import type { PortfolioProject } from "@/lib/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const sectionViewport = { once: true, amount: 0.22 };

function SectionHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial="hidden"
      transition={{ duration: 0.45, ease: "easeOut" }}
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <h2 className="text-balance text-3xl font-semibold tracking-normal md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [projectsStatus, setProjectsStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
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
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) return;

    const formData = new FormData(event.currentTarget);
    const subject = `Contato pelo portfólio — ${formData.get("name")}`;
    const body = [
      `Nome: ${formData.get("name")}`,
      `E-mail: ${formData.get("email")}`,
      "",
      String(formData.get("message"))
    ].join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <a className="sr-only rounded-md bg-background p-3 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/88 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-3 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-sm text-primary-foreground shadow-sm">
              L
            </span>
            <span>{profile.name}</span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="transition hover:text-primary"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex" size="sm" variant="outline">
              <Link href="#contato">
                <Mail className="h-4 w-4" />
                Contato
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <nav
          aria-label="Navegação móvel"
          className="container flex gap-4 overflow-x-auto pb-3 text-sm text-muted-foreground md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="whitespace-nowrap transition hover:text-primary"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="relative" id="conteudo">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),transparent_36%,rgba(14,165,233,0.10)_72%,transparent)]" />
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.55, ease: "easeOut" }}
            variants={fadeUp}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge variant="outline">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {profile.location}
              </Badge>
            </div>

            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              {profile.fullName}
              <span className="block text-primary">{profile.role}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Desenvolvedora focada em C#, ASP.NET Core, APIs REST, bancos de
              dados relacionais e arquitetura de software, com conhecimentos
              complementares em React, Vue e Java.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {profile.githubUrl && <Button asChild size="lg">
                <Link href={profile.githubUrl} rel="noreferrer" target="_blank">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>}
              {profile.linkedinUrl && <Button asChild size="lg" variant="outline">
                <Link href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>}
              {profile.resumeUrl && <Button asChild size="lg" variant="secondary">
                <Link href={profile.resumeUrl} rel="noreferrer" target="_blank">
                  <Download className="h-4 w-4" />
                  Currículo
                </Link>
              </Button>}
              {!profile.githubUrl && !profile.linkedinUrl && !profile.resumeUrl && (
                <p className="self-center text-sm text-muted-foreground">
                  Links profissionais em atualização.
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-lg border bg-card p-5 shadow-lift">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-4 font-mono text-sm leading-7">
                <p className="text-muted-foreground">public sealed class Developer</p>
                <p className="text-primary">{"{"}</p>
                <p className="pl-5">
                  Stack = <span className="text-accent">&quot;.NET, APIs, SQL&quot;</span>;
                </p>
                <p className="pl-5">
                Principles ={" "}
                  <span className="text-accent">&quot;Clean code, SOLID&quot;</span>;
                </p>
                <p className="pl-5">
                  Mindset ={" "}
                  <span className="text-accent">&quot;Learning always&quot;</span>;
                  <span className="ml-1 inline-block h-4 w-2 bg-primary align-middle animate-caret-pulse" />
                </p>
                <p className="text-primary">{"}"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y bg-muted/45" aria-label="Áreas de atuação técnica">
        <div className="container grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 first:pl-0 sm:border-l sm:first:border-0">
              <p className="font-mono text-xl font-semibold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell" id="sobre">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-normal md:text-4xl">
              Sobre Mim
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Sou estudante de Análise e Desenvolvimento de Sistemas,
              apaixonada por desenvolvimento Back-End, boas práticas de
              programação e aprendizado contínuo.
            </p>
          </div>
          <Card>
            <CardContent className="space-y-5 p-6 text-base leading-8 text-muted-foreground">
              <p>
                Minha trajetória é guiada pela construção de soluções
                organizadas, legíveis e preparadas para crescer. Tenho foco em
                Back-End .NET, criação de APIs REST, modelagem de dados e
                integração entre sistemas.
              </p>
              <p>
                Também desenvolvo interfaces com React, Next.js e Vue.js, o que
                me ajuda a entender o produto de ponta a ponta e colaborar
                melhor com times multidisciplinares.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/45" id="habilidades">
        <div className="section-shell">
          <SectionHeader
            description="Ferramentas e tecnologias que fazem parte do meu foco de estudo e desenvolvimento."
            title="Habilidades técnicas organizadas por área"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map(({ title, icon: Icon, items }) => (
              <motion.div
                key={title}
                initial="hidden"
                transition={{ duration: 0.42, ease: "easeOut" }}
                variants={fadeUp}
                viewport={sectionViewport}
                whileInView="visible"
              >
                <Card className="h-full transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift">
                  <CardHeader>
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" id="arquitetura">
        <SectionHeader
          description="Princípios e práticas de engenharia que ajudam a criar software claro, seguro e fácil de manter."
          title="Arquitetura e Boas Práticas"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {architecturePractices.map(({ label, icon: Icon }) => (
            <Card key={label} className="transition hover:border-primary/50">
              <CardContent className="flex items-center gap-3 p-5">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/45" id="projetos">
        <div className="section-shell">
          <SectionHeader
            description="Projetos carregados pela API .NET que acompanha este site."
            title="Projetos em destaque"
          />
          {projectsStatus === "loading" ? (
            <p className="py-10 text-center text-muted-foreground">Carregando projetos pela API .NET…</p>
          ) : projectsStatus === "error" ? (
            <p className="mx-auto max-w-2xl border-y py-10 text-center text-muted-foreground" role="status">
              Não foi possível carregar os projetos. Confira se a API .NET está ligada e tente novamente.
            </p>
          ) : projects.length > 0 ? <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                initial="hidden"
                transition={{ duration: 0.42, ease: "easeOut" }}
                variants={fadeUp}
                viewport={sectionViewport}
                whileInView="visible"
              >
                <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift">
                  <div className="relative aspect-[16/10] bg-secondary">
                    <Image
                      alt={`Imagem do projeto ${project.title}`}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      src={project.image}
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-1">
                      <Badge>{project.status}</Badge>
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.techs.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild size="sm" variant="outline">
                        <Link href={project.githubUrl} rel="noreferrer" target="_blank">
                          <Github className="h-4 w-4" />
                          Código
                        </Link>
                      </Button>
                      <Button asChild disabled={!project.demoUrl} size="sm">
                        <Link
                          aria-disabled={!project.demoUrl}
                          href={project.demoUrl || "#projetos"}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div> : <div className="mx-auto max-w-2xl border-y py-10 text-center">
            <p className="text-lg font-medium">Esta seleção está sendo preparada.</p>
            <p className="mt-3 leading-7 text-muted-foreground">
              Em breve, esta página vai mostrar projetos com seus repositórios e
              detalhes técnicos.
            </p>
            {profile.githubUrl && <Button asChild className="mt-6" variant="outline">
              <Link href={profile.githubUrl} rel="noreferrer" target="_blank">
                <Github className="h-4 w-4" />
                Ver perfil no GitHub
              </Link>
            </Button>}
          </div>}
        </div>
      </section>

      <section className="section-shell" id="experiencia">
        <SectionHeader
          description="Minha formação e os temas que orientam meu desenvolvimento profissional."
          title="Formação e foco"
        />
        <div className="mx-auto max-w-3xl">
          {timeline.map(({ title, subtitle, icon: Icon, description }) => (
            <div key={title} className="flex gap-5 border-t py-6 first:border-0">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{subtitle}</p>
                <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell" id="contato">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-normal md:text-4xl">
              Vamos conversar sobre APIs, backend e oportunidades.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {profile.email
                ? "Envie uma mensagem pelo formulário ou fale comigo pelos links profissionais."
                : "As informações de contato serão adicionadas aqui em breve."}
            </p>
            <div className="mt-8 space-y-4 text-muted-foreground">
              {profile.email && <Link className="flex items-center gap-3 hover:text-primary" href={`mailto:${profile.email}`}>
                <Mail className="h-5 w-5" />
                {profile.email}
              </Link>}
              {profile.githubUrl && <Link className="flex items-center gap-3 hover:text-primary" href={profile.githubUrl} rel="noreferrer" target="_blank">
                <Github className="h-5 w-5" />
                GitHub
              </Link>}
              {profile.linkedinUrl && <Link className="flex items-center gap-3 hover:text-primary" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Link>}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Entre em contato</CardTitle>
              <CardDescription>
                {profile.email
                  ? "Ao enviar, seu aplicativo de e-mail será aberto com a mensagem pronta."
                  : "O formulário ficará disponível quando o e-mail for configurado."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.email ? <form className="grid gap-4" onSubmit={handleContactSubmit}>
                <label className="grid gap-2 text-sm font-medium">
                  Nome
                  <Input name="name" placeholder="Seu nome" required />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  E-mail
                  <Input autoComplete="email" name="email" placeholder="voce@email.com" required type="email" />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Mensagem
                  <Textarea name="message" placeholder="Escreva sua mensagem" required />
                </label>
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  Enviar
                </Button>
              </form> : <p className="rounded-md bg-muted p-4 text-sm leading-6 text-muted-foreground">
                O endereço de e-mail ainda não foi informado.
              </p>}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>© 2026 {profile.fullName}. Back-End Developer (.NET).</p>
          <div className="flex items-center gap-2">
            <span>Back-End .NET · APIs · desenvolvimento contínuo.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

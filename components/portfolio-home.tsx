import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectGallery } from "@/components/project-gallery";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import type { PortfolioProject } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export default function PortfolioHome({
  initialProjects
}: {
  initialProjects: PortfolioProject[] | null;
}) {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ProjectGallery initialProjects={initialProjects} />
      <ContactSection />
      <SiteFooter />
      <Link aria-label="Voltar ao início" className={styles.backTop} href="#home"><ArrowUp aria-hidden="true" /></Link>
      <WhatsAppFloat />
    </main>

 );
}

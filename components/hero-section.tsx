import Image from "next/image";
import Link from "next/link";
import { Code2, Mail, MapPin } from "lucide-react";

import { profile } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function HeroSection() {
  return (
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
          {profile.resumeUrl && <a download href={profile.resumeUrl}>Baixar currículo</a>}
        </div>
      </div>
      <div className={styles.portraitArea}>
        <div className={styles.portrait}>
          {profile.photoUrl ? (
            <Image alt={`Foto de ${profile.fullName}`} className={styles.portraitPhoto} fill priority sizes="(max-width: 700px) 150px, 194px" src={profile.photoUrl} />
          ) : (
            <span aria-label={`Iniciais de ${profile.fullName}`} role="img">{profile.name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <p className={styles.location}><MapPin aria-hidden="true" /> {profile.location} · Disponível para projetos</p>
      </div>
    </section>
  );
}

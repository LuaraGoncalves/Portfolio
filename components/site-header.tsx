import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function SiteHeader() {
  return (
    <header className={`${styles.wrap} ${styles.header}`} id="home">
      <Link aria-label={`${profile.name}, página inicial`} className={styles.logo} href="#home">{profile.name.toUpperCase()}</Link>
      <ThemeToggle />
      <nav aria-label="Navegação principal" className={styles.nav}>
        <Link href="#home">INÍCIO</Link>
        <Link href="#about">SOBRE</Link>
        <Link href="#portfolio">PORTFÓLIO</Link>
        <Link className={styles.navContact} href="#contact">CONTATO</Link>
      </nav>
    </header>
  );
}

import Link from "next/link";

import { profile } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footerContent}`}>
        <Link className={styles.logo} href="#home">{profile.name.toUpperCase()}</Link>
        <span className={styles.copyright}>© {new Date().getFullYear()} {profile.fullName}<br />Todos os direitos reservados.</span>
        <nav aria-label="Links do rodapé" className={styles.footerLinks}>
          <Link href="#home">INÍCIO</Link><Link href="#about">SOBRE</Link><Link href="#portfolio">PORTFÓLIO</Link><Link href="#contact">CONTATO</Link>
        </nav>
      </div>
    </footer>
  );
}

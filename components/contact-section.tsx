import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { profile } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function ContactSection() {
  return (
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
          <ContactForm />
        </div>
      </div>
      <span aria-hidden="true" className={styles.sideLabel}>CONTATO</span>
    </section>
  );
}

import { Code2, Server } from "lucide-react";

import { architecturePractices, profile, skillGroups } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function AboutSection() {
  return (
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
  );
}

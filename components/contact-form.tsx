"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { profile } from "@/lib/portfolio";
import styles from "./portfolio-home.module.css";

export function ContactForm() {
  const [contactStatus, setContactStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Contato pelo portfólio — ${form.get("name")}`;
    const body = [`Nome: ${form.get("name")}`, `E-mail: ${form.get("email")}`, "", String(form.get("message"))].join("\n");
    setContactStatus("Seu aplicativo de e-mail deve abrir para concluir o envio.");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label className={styles.srOnly} htmlFor="contact-name">Seu nome</label>
      <input autoComplete="name" id="contact-name" maxLength={100} name="name" placeholder="Seu nome" required />
      <label className={styles.srOnly} htmlFor="contact-email">Seu e-mail</label>
      <input autoComplete="email" id="contact-email" maxLength={254} name="email" placeholder="Seu e-mail" required type="email" />
      <label className={styles.srOnly} htmlFor="contact-message">Sua mensagem</label>
      <textarea id="contact-message" maxLength={5000} name="message" placeholder="Sua mensagem" required />
      <button className={styles.send} type="submit"><Send aria-hidden="true" />Enviar mensagem</button>
      <p aria-live="polite" className={styles.formStatus} role="status">{contactStatus}</p>
    </form>
  );
}

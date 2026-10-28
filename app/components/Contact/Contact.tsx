"use client";

import type React from "react";
import { Github, Instagram, Linkedin, PhoneCall, Send } from "lucide-react";
import { TContent } from "@/types/content";
import styles from "./Contact.module.scss";

type ContactProps = TContent<"contact">;

const icons: Record<string, React.ElementType> = {
  Send,
  Linkedin,
  Github,
  Instagram,
};

const Contact = ({ content }: ContactProps) => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactHeader}>
        <div className={styles.contactHeaderHeading}>
          <PhoneCall />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.contactHeaderDescription}>{content.description}</p>
      </div>

      <div className={styles.contactInner}>
        <div className={styles.contactCopy}>
          <h3>{content.title}</h3>
          <p>{content.text}</p>
        </div>

        <div className={styles.contactLinks}>
          {Object.values(content.links).map((link) => {
            const Icon = icons[link.icon];

            return (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
                key={link.label}
              >
                <span className={styles.contactLinkIcon}>{Icon && <Icon />}</span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.value}</small>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;

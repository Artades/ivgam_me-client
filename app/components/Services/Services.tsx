"use client";

import { useRef } from "react";
import {
  Gauge,
  LayoutTemplate,
  LucideIcon,
  SearchCheck,
  ServerCog,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { TContent } from "@/types/content";
import styles from "./Services.module.scss";

gsap.registerPlugin(ScrollTrigger);

type ServicesProps = TContent<"services">;

const icons: Record<string, LucideIcon> = {
  LayoutTemplate,
  ServerCog,
  ShoppingCart,
  SearchCheck,
  Workflow,
  Gauge,
};

const Services = ({ content }: ServicesProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const container = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(cardsRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cardsRef.current, { opacity: 0, y: 24 });
      gsap.to(cardsRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope: container }
  );

  return (
    <section id="services" className={styles.services} ref={container}>
      <div className={styles.servicesHeader}>
        <div className={styles.servicesHeaderHeading}>
          <Workflow />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.servicesHeaderDescription}>{content.description}</p>
      </div>

      <div className={styles.servicesGrid}>
        {Object.values(content.items).map((item, i) => {
          const Icon = icons[item.icon];

          return (
            <div
              className={styles.servicesCard}
              key={item.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
                else delete cardsRef.current[i];
              }}
            >
              <div className={styles.servicesCardIcon}>
                {Icon && <Icon />}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

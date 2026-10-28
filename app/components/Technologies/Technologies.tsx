"use client";

import { useRef } from "react";
import { Laptop2 } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useDeviceType from "@/hooks/useDeviceType";
import styles from "./Technologies.module.scss";
import { TContent } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

type TechnologiesProps = TContent<"technologies">;

const techIcons: Record<string, string> = {
  Docker: "/icons/docker.svg",
  Express: "/icons/express.svg",
  Figma: "/icons/figma.svg",
  Git: "/icons/git.svg",
  GitHub: "/icons/socials/git.svg",
  JavaScript: "/icons/js.svg",
  NestJS: "/icons/nestjs.svg",
  "Next.js": "/icons/nextjs.svg",
  "Node.js": "/icons/nodejs.svg",
  PostgreSQL: "/icons/postgres.svg",
  Prisma: "/icons/prisma-orm.svg",
  React: "/icons/react.png",
  Redux: "/icons/redux.svg",
  Sass: "/icons/sass.svg",
  "Tailwind CSS": "/icons/tailwind.svg",
  TypeScript: "/icons/typescript.svg",
  Ubuntu: "/icons/ubuntu.png",
  Zustand: "/icons/zustand.svg",
};

const Technologies = ({ content }: TechnologiesProps) => {
  const { isMobile } = useDeviceType();

  const container = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.set(cardsRef.current, { opacity: 0, y: 30, scale: 0.8 });

      gsap.to(cardsRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: isMobile ? "top 60%" : "bottom 60%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope: container }
  );

  return (
    <section id="technologies" className={styles.technologies} ref={container}>
      <div className={styles.technologiesHeader}>
        <div className={styles.technologiesHeaderHeading}>
          <Laptop2 />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.technologiesHeaderDescription}>
          {content.description}
        </p>
      </div>

      <div className={styles.technologiesGrid}>
        {Object.values(content.groups).map((group, i) => (
          <div
            key={group.title}
            className={styles.technologiesGridCard}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
          >
            <h3>{group.title}</h3>
            <div className={styles.technologiesList}>
              {group.items.map((tech) => (
                <div className={styles.technologiesItem} key={tech}>
                  {techIcons[tech] && (
                    <Image
                      priority
                      src={techIcons[tech]}
                      width={36}
                      height={36}
                      alt={`Ivgam | ${tech}`}
                    />
                  )}
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;

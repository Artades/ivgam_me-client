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

const techs = [
  { name: "Java Script", icon: "/icons/js.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "NestJS", icon: "/icons/nestjs.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "PostgreSQL", icon: "/icons/postgres.svg" },
  { name: "Prisma ORM", icon: "/icons/prisma-orm.svg" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Redux", icon: "/icons/redux.svg" },
  { name: "Sass", icon: "/icons/sass.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Ubuntu", icon: "/icons/ubuntu.png" },
  { name: "Zustand", icon: "/icons/zustand.svg" },
] as const;

const Technologies = ({ content }: TechnologiesProps) => {
  const isMobile = useDeviceType();

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
        {techs.map((tech, i) => (
          <div
            key={tech.name}
            className={styles.technologiesGridCard}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
          >
            <Image
              priority
              src={tech.icon}
              width={100}
              height={100}
              alt={`Ivgam | ${tech.name}`}
            />
            <h4>{tech.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;

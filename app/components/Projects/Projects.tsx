"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.scss";
import Button from "../ui/Button/Button";
import { EButtonSizes } from "@/types/ui";
import {
  Cog,
  ClipboardCheck,
  FolderCodeIcon,
  LockKeyhole,
  LucideGithub,
  LucideProjector,
  PencilLine,
  PocketKnife,
  School,
  ShieldCheck,
  Watch,
} from "lucide-react";
import { TContent } from "@/types/content";
import useDeviceType from "@/hooks/useDeviceType";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

type ProjectsProps = TContent<"projects">;

const icons: Record<string, React.ElementType> = {
  Watch,
  PocketKnife,
  Cog,
  School,
  PencilLine,
  LockKeyhole,
  ShieldCheck,
  ClipboardCheck,
};

const Projects = ({ content }: ProjectsProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleProjects, setVisibleProjects] = useState(0);

  const cards = useMemo(() => {
    return Object.entries(content.items).map(([key, project]) => ({
      key,
      name: project.name,
      category: project.category,
      description: project.description,
      button: project.button,
      roleTitle: project.role.title,
      roleValues: project.role.values,
      impact: project.impact,
      stack: project.stack,
      icon: icons[project.icon],
      inProduction: project.inProduction,
      link: project.link,
    }));
  }, [content.items]);

  const { isMobile, isTablet } = useDeviceType();

  const calculateVisible = useCallback(() => {
    if (isMobile) return 2;
    if (isTablet) return Math.min(cards.length, 4);
    return Math.min(cards.length, 3);
  }, [cards.length, isMobile, isTablet]);

  useEffect(() => {
    setVisibleProjects(calculateVisible());
  }, [calculateVisible]);

  const barPercentage = (visibleProjects / cards.length) * 100;

  //refs
  const container = useRef<HTMLElement>(null);
  const projectsRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([container.current, ...projectsRefs.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      projectsRefs.current.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          scale: 0.6,
          rotateY: -25,
          transformPerspective: 800,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",

          toggleActions: "play none none none",
          immediateRender: true,
          once: true,
        },
      });

      projectsRefs.current.forEach((el, i) => {
        tl.to(
          el,
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            ease: "power3.in",
          },
          0.1
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <section id="projects" className={styles.projects} ref={container}>
      <div className={styles.projectsHeader}>
        <div className={styles.projectsHeaderHeading}>
          <FolderCodeIcon />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.projectsHeaderDescription}>
          {content.description}
        </p>
      </div>

      <div className={styles.projectsCardGrid}>
        {cards.map((card, i) => (
          <div
            key={card.key}
            className={`${styles.card} ${
              i < visibleProjects ? "" : styles.cardHidden
            }`}
            ref={(el) => {
              if (el) {
                projectsRefs.current[i] = el;
              } else delete projectsRefs.current[i];
            }}
          >
            <div
              title="Status | In Production"
              className={styles.indicator}
              style={{
                borderColor: !card.inProduction ? "rgb(248, 73, 120)" : undefined,
              }}
              
            ></div>
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <card.icon />
                <div>
                  <span className={styles.cardCategory}>{card.category}</span>
                  <h3 className={styles.cardTitle}>{card.name}</h3>
                </div>
              </div>
              <p className={styles.cardDescription}>{card.description}</p>
              <div className={styles.cardRole}>
                <span>{card.roleTitle}</span>
                <p>{card.roleValues}</p>
              </div>
              <p className={styles.cardImpact}>{card.impact}</p>
              <div className={styles.cardStack}>
                {card.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {card.link ? (
                <Link href={card.link} target="_blank">
                  <Button size={EButtonSizes.DEFAULT}>
                    {card.button}{" "}
                    {card.inProduction ? <LucideProjector /> : <LucideGithub />}
                  </Button>
                </Link>
              ) : (
                <Button size={EButtonSizes.DEFAULT} disabled>
                  {card.button} <LockKeyhole />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.projectsShowMore}>
        <p className={styles.projectsShowMoreCount}>
          {visibleProjects} / {cards.length}
        </p>
        <div className={styles.projectsBarPercentage}>
          <div
            className={styles.projectsBarFill}
            style={{ width: `${barPercentage}%` }}
          />
        </div>
        {visibleProjects === cards.length ? (
          <Button
            size={EButtonSizes.DEFAULT}
            onClick={() => {
              setVisibleProjects(calculateVisible());
              if (container.current) {
                window.scrollTo({
                  top: container.current.offsetTop - 100, 
                  behavior: "smooth",
                });
              }
            }}
          >
            {content.buttons.hide}
          </Button>
        ) : (
          <Button
            size={EButtonSizes.DEFAULT}
            onClick={() => setVisibleProjects(cards.length)}
          >
            {content.buttons.showMore}
          </Button>
        )}
      </div>
    </section>
  );
};

export default Projects;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Projects.module.scss";
import Button from "../ui/Button/Button";
import { EButtonSizes } from "@/types/ui";
import {
  Cog,
  FolderCodeIcon,
  PencilLine,
  PocketKnife,
  School,
  Watch,
} from "lucide-react";
import { TContent } from "@/types/content";

gsap.registerPlugin(useGSAP);

type ProjectsProps = TContent<"projects">;

const icons: Record<string, React.ElementType> = {
  Watch,
  PocketKnife,
  Cog,
  School,
  PencilLine,
};

const Projects = ({ content }: ProjectsProps) => {
  const [visibleProjects, setVisibleProjects] = useState(0);

  const cards = Object.entries(content.items).map(([key, project]) => ({
    key,
    backgroundImage: project.image,
    name: project.name,
    description: project.description,
    button: project.button,
    roleTitle: project.role.title,
    roleValues: project.role.values,
    icon: icons[project.icon],
  }));

  const calculateVisible = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) return 2;
    if (width < 1200) return Math.min(cards.length, 4);
    return Math.min(cards.length, 3);
  }, [cards.length]);

  useEffect(() => {
    const update = () => setVisibleProjects(calculateVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [calculateVisible, cards.length]);

  const barPercentage = (visibleProjects / cards.length) * 100;

  return (
    <section id="projects" className={styles.projects}>
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
          >
            <div className={styles.cardBody}>
              <div className={styles.cardHeader}>
                <card.icon />
                <h3 className={styles.cardTitle}>{card.name}</h3>
              </div>
              <p className={styles.cardDescription}>{card.description}</p>
              <div className={styles.cardRole}>
                <p>{card.roleValues}</p>
              </div>
              <Button size={EButtonSizes.DEFAULT}>{card.button}</Button>
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
            onClick={() => setVisibleProjects(calculateVisible())}
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

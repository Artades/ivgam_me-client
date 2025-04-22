"use client";

import React, { ReactNode, useRef } from "react";
import styles from "./About.module.scss";
import { TContent } from "@/types/content";
import {
  BadgeInfo,
  Bike,
  Dumbbell,
  FolderCodeIcon,
  Gamepad2,
  MountainSnow,
  Pin,
  Telescope,
} from "lucide-react";
import Button from "../ui/Button/Button";
import { useInfoModalFacade } from "@/facades/useInfoModalFacade";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AboutProps = TContent<"about">;

const icons: Record<string, React.ElementType> = {
  MountainSnow,
  Bike,
  Gamepad2,
  Telescope,
  Dumbbell,
  Pin,
  FolderCodeIcon,
};

const About = ({ content }: AboutProps) => {
  gsap.registerPlugin(ScrollTrigger);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { toggleModal } = useInfoModalFacade();

  //refs
  const container = useRef<HTMLElement>(null);
  const interestsRefs = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { opacity: 1 });
        return;
      }
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      for (let i = 0; i < interestsRefs.current.length; i++) {
        gsap.set(interestsRefs.current[i], {
          opacity: 0,
          y: i * 20,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(textRef.current, { opacity: 1, y: 0 });

      for (let i = 0; i < interestsRefs.current.length; i++) {
        tl.to(interestsRefs.current[i], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.1,
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );
  const renderInterests = (): ReactNode => {
    return Object.values(content.interests).map((interest, i) => {
      const Icon = icons[interest.icon];
      return (
        <div
          className={styles.aboutInterest}
          key={i}
          ref={(el) => {
            if (el) interestsRefs.current[i] = el;
            else delete interestsRefs.current[i];
          }}
        >
          <div className={styles.aboutInterestIconWrapper}>
            {Icon && <Icon className={styles.aboutInterestIconWrapperIcon} />}
          </div>
          <div>
            <h4 className={styles.aboutInterestName}>{interest.name}</h4>
            <p className={styles.aboutInterestValue}>{interest.value}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <section id="about" className={styles.about} ref={container}>
      <div className={styles.aboutHeader}>
        <div className={styles.aboutHeaderHeading}>
          <Pin />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.aboutHeaderDescription}>{content.description}</p>
      </div>

      <div className={styles.aboutInner}>
        <div className={styles.aboutTextBlock} ref={textRef}>
          <p className={styles.aboutText}>{content.text}</p>
        </div>

        <div className={styles.aboutInterestsBlock}>
          <h3 className={styles.sectionTitle}>{content.interestsHeading}</h3>
          <div className={styles.aboutInterests}>{renderInterests()}</div>
        </div>

        <div className={styles.aboutButtons}>
          <Button onClick={toggleModal}>
            <BadgeInfo />
            <span>{content["learnMoreBtn"]}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;

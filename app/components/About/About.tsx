"use client";

import React, { useRef } from "react";
import styles from "./About.module.scss";
import { TContent } from "@/types/content";
import {
  FolderCodeIcon,
  Pin,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AboutProps = TContent<"about">;

const icons: Record<string, React.ElementType> = {
  Pin,
  FolderCodeIcon,
};

const About = ({ content }: AboutProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const container = useRef<HTMLElement>(null);
  const highlightsRefs = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([container.current, textRef.current, ...highlightsRefs.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);


      gsap.set(textRef.current, { opacity: 0, y: 20 });
      highlightsRefs.current.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: i * 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        
      });

      tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.5 });

      highlightsRefs.current.forEach((el) => {
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.1,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

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
          <h3 className={styles.sectionTitle}>{content.highlightsHeading}</h3>
          <div className={styles.aboutInterests}>
            {Object.values(content.highlights).map((highlight, i) => {
              const Icon = icons[highlight.icon];

              return (
                <div
                  className={styles.aboutInterest}
                  key={highlight.name}
                  ref={(el) => {
                    if (el) highlightsRefs.current[i] = el;
                    else delete highlightsRefs.current[i];
                  }}
                >
                  <div className={styles.aboutInterestIconWrapper}>
                    {Icon && (
                      <Icon className={styles.aboutInterestIconWrapperIcon} />
                    )}
                  </div>
                  <div>
                    <h4 className={styles.aboutInterestName}>{highlight.name}</h4>
                    <p className={styles.aboutInterestValue}>{highlight.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

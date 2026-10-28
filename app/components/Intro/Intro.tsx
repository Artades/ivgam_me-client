"use client";

import { EButtonVariants } from "@/types/ui";
import Button from "../ui/Button/Button";
import styles from "./Intro.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { getContent } from "@/utils/getContent";
import { scrollToSection } from "@/helpers/scroll";
import { ArrowDownRight, LucideGithub } from "lucide-react";
import Link from "next/link";

interface IntroProps {
  content: Awaited<ReturnType<typeof getContent>>["intro"];
}
export default function Intro({ content }: IntroProps) {
  const headingLine = useRef<HTMLDivElement>(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);
  const container = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { opacity: 1 });
        gsap.set(headingLine.current, { width: "7rem" });
        gsap.set(headingRef.current, { opacity: 1, y: 30 });
        gsap.set(textRef.current, { opacity: 1, y: 0 });
        gsap.set(buttonRef.current, { opacity: 1, y: 0 });
        gsap.set(statsRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(headingLine.current, { opacity: 0, width: 0 });
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(statsRef.current, { opacity: 0, y: 20 });
      gsap.set(container.current, { opacity: 1 });

      const tl = gsap.timeline();

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      });

      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      });

      tl.to(headingLine.current, {
        opacity: 1,
        width: "7rem",
        duration: 0.6,
        ease: "power4.out",
      });
      tl.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    },
    { scope: container }
  );

  return (
    <div className={styles.intro} ref={container}>
      <div className={styles.introContent}>
        <div ref={headingLine} className={styles.introHeadingLine} />
        <p className={styles.introRole}>{content.role}</p>
        <h1 className={styles.introHeading} ref={headingRef}>
          {content.title.hello}
          <span>{content.title.artyom}</span>
        </h1>
        <p className={styles.introText} ref={textRef}>
          {content.desc}
        </p>
        <div className={styles.introBtnGroup} ref={buttonRef}>
          <Button onClick={() => scrollToSection("projects")}>
            {content.buttons.work}
            <ArrowDownRight />
          </Button>
          <Button onClick={() => scrollToSection("contact")}>
            {content.buttons.contact}
          </Button>
          <Link href={content.buttons.git} target="_blank">
            <Button variant={EButtonVariants.OUTLINE}>
              <LucideGithub />
              Git Hub
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.introStats} ref={statsRef}>
        {Object.values(content.stats).map((stat) => (
          <div className={styles.introStat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

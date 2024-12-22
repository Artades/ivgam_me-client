"use client";

import { EButtonSizes, EButtonVariants } from "@/types/ui";
import Button from "../ui/Button/Button";
import styles from "./styles.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import Image from "next/image";

export default function Intro() {
  const headingLine = useRef<HTMLDivElement>(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const creator = useRef(null);
  const container = useRef(null);
  const introImageRef = useRef(null);
  const introImageCircleBefore = useRef(null);
  const introImageCircleAfter = useRef(null);
  

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { opacity: 1 });
        gsap.set(headingLine.current, { width: "7rem" });
        gsap.set(headingRef.current?.children, {
          opacity: 1,
          y: 0,
          color: "#18aaff",
        });
        gsap.set(textRef.current, { opacity: 1, y: 0 });
        gsap.set(buttonRef.current, { opacity: 1, y: 0 });
        gsap.set(introImageRef.current, { opacity: 1 });
        return;
      }

      gsap.set(headingLine.current, { opacity: 0, width: 0 });
      gsap.set(headingRef.current?.children, { opacity: 0, y: 50 });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(container.current, { opacity: 1 });
      gsap.set(creator.current, { color: "#fff" });

      const tl = gsap.timeline();

      
      tl.to(headingRef.current?.children, {
        opacity: 1,
        y: 0,
        color: "#18aaff",
        duration: 0.8,
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      });

      tl.to(headingLine.current, {
        opacity: 1,
        width: "7rem",
        duration: 1,
      });

     
      tl.to([introImageCircleBefore.current, introImageCircleAfter.current], {
        rotation: 45,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  return (
    <div className={styles.intro} ref={container}>
      <div className={styles.introContent}>
        <div ref={headingLine} className={styles.introHeadingLine} />
        <h1 className={styles.introHeading} ref={headingRef}>
          Hello, i'm <br />
          <span>Artyom</span>
        </h1>
        <p className={styles.introText} ref={textRef}>
          A prolific developer focused on creating advanced, user-driven
          web-applications that merge creativity with functionality.
        </p>
        <Button
          text="View Resumee"
          size={EButtonSizes.DEFAULT}
          ref={buttonRef}
          variant={EButtonVariants.OUTLINE}
        />
      </div>
      <div className={styles.introImage} ref={introImageRef}>
        <div className={styles.circleBefore} ref={introImageCircleBefore}></div>
        <div className={styles.circleAfter} ref={introImageCircleAfter}></div>
        <Image width={400} height={400} alt="Artyom Galay" src={"/assets/Intro/m2.jpg"} />
      </div>
    </div>
  );
}

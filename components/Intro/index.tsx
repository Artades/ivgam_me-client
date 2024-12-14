"use client";
import { EButtonSizes } from "@/types/ui";
import Button from "../ui/Button/Button";
import styles from "./styles.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";

export default function Intro() {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const creator = useRef(null);
  const container = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { opacity: 1 });
        gsap.set(headingRef.current?.children, { opacity: 1, y: 0 });
        gsap.set(textRef.current, { opacity: 1, y: 0 });
        gsap.set(buttonRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(headingRef.current?.children, { opacity: 0, y: 50 });
      gsap.set(textRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      gsap.set(container.current, { opacity: 1 });
      gsap.set(creator.current, { color: "#fff" });

      const tl = gsap.timeline();

      tl.to(headingRef.current?.children, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
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

	  tl.to(creator.current, {
        color: "#18aaff",
		duration: 0.6,
      });
    },
    { scope: container }
  );

  return (
    <div className={styles.intro} ref={container}>
      <div className={styles.introContent}>
        <h1 className={styles.introHeading} ref={headingRef}>
          <span>Advance.</span>
          <span>Create.</span>
          <span>Inspire.</span>
        </h1>
        <p className={styles.introText} ref={textRef}>
          Hi, I’m <span ref={creator}>Artyom Galay</span>, a developer focused
          on building innovative, user-driven websites and applications that
          merge creativity with functionality.
        </p>
        <Button text="Resumee" size={EButtonSizes.DEFAULT} ref={buttonRef} />
      </div>
    </div>
  );
}

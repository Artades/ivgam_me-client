"use client";

import React, { useRef } from "react";
import styles from "./BackgroundEffect.module.scss"
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as animation from "@/config/animation";

const BackgroundEffect = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const shapeRefs = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !shapeRefs.current.includes(el)) {
      shapeRefs.current.push(el);
    }
  };

  const generateRandomClipPath = (pointCount = 16) => {
    let clipPath = "polygon(";
    for (let i = 0; i < pointCount; i++) {
      const randX = Math.random() * 100;
      const randY = Math.random() * 100;
      clipPath += `${randX}% ${randY}%, `;
    }
    clipPath = clipPath.slice(0, -2);
    clipPath += ")";
    return clipPath;
  };

  const generateRandomStyle = () => {
    const size = Math.random() * 50 + 30;
    return {
      clipPath: generateRandomClipPath(),
      width: `${size}rem`,
      height: `${size}rem`,
    };
  };

  const renderShapes = () => {
    const shapes = [];
    const rows = 1;
    const cols = 3;
    const totalShapes = rows * cols;

    const gridWidth = 100 / cols;
    const gridHeight = 100 / rows;

    for (let i = 0; i < totalShapes; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;

      const style = generateRandomStyle();

      shapes.push(
        <div
          key={i}
          ref={addToRefs}
          className={styles.polygonBackground}
          style={{
            ...style,
            position: "absolute",
            top: `${row * gridHeight}%`,
            left: `${col * gridWidth}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        ></div>
      );
    }
    return shapes;
  };

  useGSAP(() => {
    if (prefersReducedMotion) {
      shapeRefs.current.forEach((el) => {
        gsap.set(el, { clipPath: animation.basicClipPath });
      });
      return;
    }

    shapeRefs.current.forEach((el) => {
      gsap.to(el, {
        clipPath: generateRandomClipPath(),
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className={styles.backgroundContainer}>
      {renderShapes()}
    </div>
  );
};

export default BackgroundEffect;

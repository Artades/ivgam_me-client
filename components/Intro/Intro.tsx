// components/Intro.tsx
"use client"

// components/Intro.tsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Intro.module.scss';

const Intro: React.FC = () => {
  useEffect(() => {
    // GSAP анимация
    gsap.fromTo(
      '.pulse-path',
      { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 1 },
      {
        strokeDashoffset: 0,
        opacity: 0,
        duration: 5,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          // Обновляем opacity
          gsap.set('.pulse-path', { strokeDasharray: 1000 });
        }
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 130 209" fill="none">
        {/* Сетка */}
     
        {/* Анимация импульса */}
        <path
          className="pulse-path"
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeWidth="1"
          d="M129 0.5V95C129 95.5523 128.552 96 128 96H66C65.4477 96 65 96.4477 65 97V200C65 204.142 61.6421 207.5 57.5 207.5H1"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#3291FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#3291FF" />
            <stop offset="100%" stopColor="#61DAFB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Intro;

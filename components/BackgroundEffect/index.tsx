    "use client";

    import React, { useRef } from "react";
    import styles from "./styles.module.scss";
    import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
    import { useGSAP } from "@gsap/react";
    import gsap from "gsap";
    import * as animation from "@/config/animation";

    const BackgroundEffect = () => {
    const shapeRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();


    const generateRandomClipPath = () => {
        let clipPath = "polygon(";
        for (let i = 0; i < 16; i++) {
        const randX = Math.random() * 100;
        const randY = Math.random() * 100;
        clipPath += `${randX}% ${randY}%, `;
        }
        clipPath = clipPath.slice(0, -2);
        clipPath += ")";
        return clipPath;
    };

    
    useGSAP(() => {
        if (prefersReducedMotion) {
        gsap.set(shapeRef.current, { clipPath: animation.basicClipPath });
        return;
        }


        gsap.to(shapeRef.current, {
        clipPath: generateRandomClipPath(),
        duration: 7,
        repeat: -1,
        yoyo: true, 
        ease: "power1.inOut",
        onRepeat: () => {
            gsap.to(shapeRef.current, {
            clipPath: generateRandomClipPath(),
            duration: 7,
            ease: "power1.inOut",
            });
        },
        });
    }, [prefersReducedMotion]);

    return (
        <div aria-hidden="true" className={styles.backgroundContainer}>
        <div
            ref={shapeRef}
            className={styles.polygonBackground}
            style={{
            clipPath: `polygon(
                74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 
                80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 
                47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 
                17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%
            );`,
            }}
        ></div>
        
        </div>
    );
    };

    export default BackgroundEffect;

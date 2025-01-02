"use client";

import { EButtonSizes, EButtonVariants } from "@/types/ui";
import Button from "../ui/Button/Button";
import styles from "./Intro.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import Image from "next/image";
import { ArrowDownToDot } from "lucide-react";

export default function Intro() {
	const headingLine = useRef<HTMLDivElement>(null);
	const headingRef = useRef(null);
	const textRef = useRef(null);
	const buttonRef = useRef(null);
	const container = useRef(null);
	const introImageRef = useRef(null);

	const prefersReducedMotion = usePrefersReducedMotion();

	useGSAP(
		() => {
			if (prefersReducedMotion) {
				gsap.set(container.current, { opacity: 1 });
				gsap.set(headingLine.current, { width: "7rem" });
				gsap.set(headingRef.current, { opacity: 0, y: 30 });
				gsap.set(textRef.current, { opacity: 1, y: 0 });
				gsap.set(buttonRef.current, { opacity: 1, y: 0 });
				gsap.set(introImageRef.current, { opacity: 1 });
				return;
			}

			gsap.set(headingLine.current, { opacity: 0, width: 0 });
			gsap.set(headingRef.current, { opacity: 0, y: 50 });
			gsap.set(textRef.current, { opacity: 0, y: 30 });
			gsap.set(buttonRef.current, { opacity: 0, y: 20 });
			gsap.set(introImageRef.current, { opacity: 0, y: 20 });
			gsap.set(container.current, { opacity: 1 });

			const tl = gsap.timeline();

			tl.to(headingRef.current, {
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power4.out",
			});

			tl.to(textRef.current, {
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power4.out",
			});

			tl.to(buttonRef.current, {
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power4.out",
			});

			tl.to(headingLine.current, {
				opacity: 1,
				width: "7rem",
				duration: 0.8,
				ease: "power4.out",
			});
			tl.to(introImageRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power4.out",
			});
		},
		{ scope: container }
	);

	return (
		<div className={styles.intro} ref={container}>
			<div className={styles.introContent}>
				<div ref={headingLine} className={styles.introHeadingLine} />
				<h1 className={styles.introHeading} ref={headingRef}>
					Hello, i&#39;m <br />
					<span>Artyom</span>
				</h1>
				<p className={styles.introText} ref={textRef}>
					A developer focused on creating advanced, user-driven web-applications
					that merge creativity with functionality.
				</p>
				<div className={styles.introBtnGroup} ref={buttonRef}>
					<Button>Contact Me</Button>
					<Button variant={EButtonVariants.OUTLINE}>View CV</Button>
				</div>
			</div>
			<div className={styles.introImage} ref={introImageRef}>
				<Image
					quality={100}
					width={2000}
					height={2000}
					alt="Artyom Galay"
					src={"/assets/Intro/m2.jpg"}
				/>
			</div>
			{/* 	<nav className={styles.introScrollButton}>
				<Button variant={EButtonVariants.OUTLINE}>
					<ArrowDownToDot />
				</Button>
			</nav> */}
		</div>
	);
}

"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Projects.module.scss";
import { getContent } from "@/utils/getContent";
import Button from "../ui/Button/Button";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import {
	ChevronLeft,
	ChevronRight,
	Cog,
	PencilLine,
	PocketKnife,
	School,
	Watch,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

interface ProjectsProps {
	content: Awaited<ReturnType<typeof getContent>>["projects"];
}

const icons: Record<string, React.ElementType> = {
	Watch,
	PocketKnife,
	Cog,
	School,
	PencilLine,
} as const;

const Projects = ({ content }: ProjectsProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const slideRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slideWidth, setSlideWidth] = useState(0);
	const [visibleSlides, setVisibleSlides] = useState(3);

	const slides = Object.keys(content.items).map((key) => {
		const project = content.items[key as keyof typeof content.items];
		return {
			key,
			backgroundImage: project.image,
			name: project.name,
			description: project.description,
			button: project.button,
			roleTitle: project.role.title,
			roleValues: project.role.values,
      icon: icons[project.icon]
		};
	});

	const gap = 24; 

	useLayoutEffect(() => {
		const updateSlideSettings = () => {
			const screenWidth = window.innerWidth;

			let newVisibleSlides = 3;
			if (screenWidth <= 1024) newVisibleSlides = 2.5;
			if (screenWidth <= 768) newVisibleSlides = 1;

			setVisibleSlides(newVisibleSlides);

			if (slideRef.current && containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				setSlideWidth(
					(containerWidth - (newVisibleSlides - 1) * gap) / newVisibleSlides
				);
			}
		};

		updateSlideSettings();
		window.addEventListener("resize", updateSlideSettings);
		return () => window.removeEventListener("resize", updateSlideSettings);
	}, []);

	const maxIndex = Math.max(0, Math.ceil(slides.length - visibleSlides));

	const scrollToIndex = (index: number) => {
		if (!containerRef.current) return;

		const newIndex = Math.max(0, Math.min(index, maxIndex));
		setCurrentIndex(newIndex);

		gsap.to(containerRef.current, {
			x: -newIndex * (slideWidth + gap),
			duration: 0.5,
			ease: "power2.out",
		});
	};

	return (
		<section className={styles.projects}>
			<h2 className={styles.heading}>{content.heading}</h2>

			<div className={styles.wrapper}>
				<Button
					variant={EButtonVariants.CIRCLED}
					onClick={() => scrollToIndex(currentIndex - 1)}
					disabled={currentIndex === 0}
				>
					<ChevronLeft />
				</Button>

				<div className={styles.slider}>
					<div ref={containerRef} className={styles.projectContainer}>
						{slides.map((project, i) => (
							<div
								key={project.key}
								ref={i === 0 ? slideRef : null}
								className={styles.project}
								style={{
									// backgroundImage: `url(${project.backgroundImage})`,
									width: `${slideWidth}px`,
								}}
							>
								<div className={styles.overlay}></div>
								<div className={styles.projectInfo}>
									<div className={styles.projectHeader}>
										<project.icon />
										<h3 className={styles.projectTitle}>{project.name}</h3>
									</div>
									<p className={styles.projectDescription}>
										{project.description}
									</p>
									<div className={styles.projectRole}>
										<h4>{project.roleTitle}</h4>
										<p>{project.roleValues}</p>
									</div>
									<Button size={EButtonSizes.DEFAULT}>{project.button}</Button>
								</div>
							</div>
						))}
					</div>
				</div>

				<Button
					variant={EButtonVariants.CIRCLED}
					size={EButtonSizes.SMALLER}
					onClick={() => scrollToIndex(currentIndex + 1)}
					disabled={currentIndex >= maxIndex}
				>
					<ChevronRight />
				</Button>
			</div>
		</section>
	);
};

export default Projects;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Projects.module.scss";
import { getContent } from "@/utils/getContent";
import Button from "../ui/Button/Button";
import { EButtonSizes } from "@/types/ui";

gsap.registerPlugin(useGSAP);

interface ProjectsProps {
	content: Awaited<ReturnType<typeof getContent>>["projects"];
}

const Projects = ({ content }: ProjectsProps) => {
	const slides = Object.keys(content.items).map((key: string) => {
		const project = content.items[key as keyof typeof content.items];
		return {
			key,
			backgroundImage: project.image,
			name: project.name,
			description: project.description,
			button: project.button,
			roleTitle: project.role.title,
			roleValues: project.role.values,
		};
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleTabClick = (index: number) => {
		setActiveIndex(index);
	};

	useGSAP(() => {
		gsap.to(`.${styles.project}`, {
			flex: 1,
			duration: 0.5,
			ease: "power2.inOut",
		});

		gsap.to(`.${styles.active}`, {
			flex: 5,
			duration: 0.5,
			ease: "power2.inOut",
		});

		gsap.to(`.${styles.active} .${styles.projectInfo}`, {
			opacity: 1,
			visibility: "visible",
			y: 0,
			duration: 0.3,
			ease: "power2.out",
		});
	}, [activeIndex]);

	return (
		<section className={styles.projects}>
			<h2 className={styles.heading}>{content.heading}</h2>

			<div className={styles.projectContainer} ref={containerRef}>
				{slides.map((project, index) => (
					<div
						key={project.key}
						className={`${styles.project} ${
							index === activeIndex ? styles.active : ""
						}`}
						style={{ backgroundImage: `url(${project.backgroundImage})` }}
						onClick={() => handleTabClick(index)}
					>
						<div className={styles.overlay}></div>
						<div className={styles.projectInfo}>
							<h2 className={styles.projectTitle}>{project.name}</h2>
							<p className={styles.projectDescription}>{project.description}</p>
							<div className={styles.projectRole}>
								<h4>{project.roleTitle}</h4>
								<p>{project.roleValues}</p>
							</div>
							<Button size={EButtonSizes.DEFAULT}>{project.button}</Button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Projects;

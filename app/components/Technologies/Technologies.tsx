import { TContent } from "@/types/content";
import styles from "./Technologies.module.scss";
import React from "react";
import { Laptop2 } from "lucide-react";

type TechnologiesProps = TContent<"technologies">;

const Technologies = ({ content }: TechnologiesProps) => {
    const technologies = Object.values(content.items).map((tech, i) => {
        
    })
	return (
		<section className={styles.technologies}>
			<div className={styles.technologiesHeader}>
				<div className={styles.technologiesHeaderHeading}>
					<Laptop2 />
					<h2>{content.heading}</h2>
				</div>
				<p className={styles.technologiesHeaderDescription}>
					{content.description}
				</p>
			</div>

			<div className={styles.technologiesGrid}>
				{techs.map((tech) => (
					<div key={tech.key} className={styles.techCard}>
						<tech.icon className={styles.techIcon} />
						<span className={styles.techName}>{tech.name}</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default Technologies;

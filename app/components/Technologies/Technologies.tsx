import { TContent } from "@/types/content";
import styles from "./Technologies.module.scss";
import React from "react";
import { Laptop2 } from "lucide-react";
import Image from "next/image";


type TechnologiesProps = TContent<"technologies">;

const techs = [
	{ name: 'Docker', icon: '/icons/docker.svg'},
	{ name: 'Express', icon: '/icons/express.svg' },
	{ name: 'Figma', icon: '/icons/figma.svg' },
	{ name: 'Git', icon: '/icons/git.svg' },
	{ name: 'NestJS', icon: '/icons/nestjs.svg' },
	{ name: 'Next.js', icon: '/icons/nextjs.svg' },
	{ name: 'Node.js', icon: '/icons/nodejs.svg' },
	{ name: 'PostgreSQL', icon: '/icons/postgres.svg' },
	{ name: 'Prisma ORM', icon: '/icons/prisma-orm.svg' },
	{ name: 'React', icon: '/icons/react.png' },
	{ name: 'Redux', icon: '/icons/redux.svg' },
	{ name: 'Sass', icon: '/icons/sass.svg' },
	{ name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
	{ name: 'TypeScript', icon: '/icons/typescript.svg' },
	{ name: 'Ubuntu', icon: '/icons/ubuntu.png' },
	{ name: 'Zustand', icon: '/icons/zustand.svg' },
  ] as const;
  
const Technologies = ({ content }: TechnologiesProps) => {
  return (
    <section id="technologies" className={styles.technologies}>
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
          <div key={tech.name} className={styles.technologiesGridCard}>
			<Image priority src={tech.icon} width={100} height={100} alt={`Ivgam | ${tech.name}`} />
            <h4>{tech.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;

import { EButtonSizes } from "@/types/ui";
import StarGrid from "../AnimatedGrid/StarGrid";
import Button from "../ui/Button/Button";
import styles from "./styles.module.scss";

export default function Intro() {
	return (
		<div className={styles.intro}>
			{/* <StarGrid /> */}
			<div className={styles.introContent}>
				<h1 className={styles.introHeading}>
					<span>Innovate.</span>

					<span>Create.</span>

					<span>Inspire</span>
				</h1>
				<p className={styles.introText}>
					Hi, I’m Artyom Galay, a developer focused on building innovative,
					user-driven websites and applications that merge creativity with
					functionality.
				</p>

				<Button text="Resumee" size={EButtonSizes.DEFAULT}  />
			</div>
		</div>
	);
}

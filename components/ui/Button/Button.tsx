import { ComponentProps, forwardRef, useRef } from "react";
import clsx from "clsx";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import styles from "./Button.module.scss";

interface ButtonProps extends ComponentProps<"button"> {
	size?: EButtonSizes;
	variant?: EButtonVariants;
	children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			size = EButtonSizes.DEFAULT,
			variant = EButtonVariants.PRIMARY,
			...props
		},
		ref
	) => {
		const buttonRef = useRef<HTMLButtonElement | null>(null);

		const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
			const button = buttonRef.current;
			if (!button) return;

			const rect = button.getBoundingClientRect();
			const ripple = document.createElement("span");
			ripple.className = styles.ripple;
			ripple.style.width = ripple.style.height = `${Math.max(
				rect.width,
				rect.height
			)}px`;
			ripple.style.left = `${e.clientX - rect.left - rect.width / 2}px`;
			ripple.style.top = `${e.clientY - rect.top - rect.height / 2}px`;

			button.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);

			createSparkles(e, button);
		};

		const createSparkles = (
			e: React.MouseEvent<HTMLButtonElement>,
			button: HTMLButtonElement
		) => {
			const sparklesCount = 5;
			for (let i = 0; i < sparklesCount; i++) {
				const sparkle = document.createElement("span");
				sparkle.className = styles.sparkle;
				const x = Math.random() * 10 - 1; 
				const y = Math.random() * 10 - 1; 

				sparkle.style.setProperty("--x", `${x}`);
				sparkle.style.setProperty("--y", `${y}`);
				sparkle.style.left = `${
					e.clientX - button.getBoundingClientRect().left
				}px`;
				sparkle.style.top = `${
					e.clientY - button.getBoundingClientRect().top
				}px`;

				button.appendChild(sparkle);
				setTimeout(() => sparkle.remove(), 1000);
			}
		};

		return (
			<button
				ref={buttonRef}
				className={clsx(styles.button, styles[size], styles[variant])}
				{...props}
				onClick={handleRipple}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
export default Button;

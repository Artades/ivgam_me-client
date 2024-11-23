import { SyntheticEvent, forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import styles from "./Button.module.scss";

interface ButtonProps {
	text?: string;
	size?: EButtonSizes;
	variant?: EButtonVariants;
	disabled?: boolean;
	icon?: JSX.Element;
	link?: string;
	onClick?: (e: SyntheticEvent) => void;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(
	(
		{
			text,
			size = EButtonSizes.DEFAULT,
			variant = EButtonVariants.PRIMARY,
			onClick,
			icon,
			disabled = false,
			link,
		},
		ref
	) => {
		const buttonClass = clsx(styles.button, styles[size], styles[variant], {
			[styles.disabled]: disabled,
			[styles.withIcon]: !!icon,
		});

		const content = (
			<div
				ref={ref}
				className={buttonClass}
				onClick={!disabled ? onClick : undefined}
				role={link ? "link" : "button"}
				aria-disabled={disabled}
			>
				{icon && <span className={styles.icon}>{icon}</span>}
				{text && <span className={styles.text}>{text}</span>}
			</div>
		);

		return link ? <Link href={link}>{content}</Link> : content;
	}
);

Button.displayName = "Button";
export default Button;

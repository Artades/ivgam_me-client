// Container.tsx

import React from "react";
import styles from "./Container.module.scss";

// Определите типы для пропсов компонента
interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
	/**
	 * Дополнительные классы для контейнера
	 */
	className?: string;

	/**
	 * Стиль для контейнера
	 */
	style?: React.CSSProperties;

	/**
	 * Дополнительные свойства, передаваемые в div
	 */
	[key: string]: any;
}

// Функциональный компонент Container
const Container: React.FC<ContainerProps> = ({
	className,
	style,
	children,
	...props
}) => {
	return (
		<div
			className={`${styles.container} ${className ? className : ""}`}
			style={style}
			{...props}
		>
			{children}
		</div>
	);
};

export default Container;

"use client";
// src/components/StarGrid.tsx

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/ui/usePrefersReducedMotion";
import styles from "./StarGrid.module.scss"
export default function StarGrid() {
	const container = useRef(null);
	const prefersReducedMotion = usePrefersReducedMotion();
	gsap.registerPlugin(useGSAP);

	const grid = [14, 30] as const;

	useGSAP(
		() => {
			if (prefersReducedMotion) {
				gsap.set(container.current, { opacity: 1 });
				gsap.set(".grid-item", {
					opacity: 0.2,
					scale: 1,
				});
				return;
			}

			gsap.set(".grid-item", {
				opacity: 0,
				transformOrigin: "center",
				color: "#fff",
			});
			gsap.set(container.current, { opacity: 1 });

			const tl = gsap.timeline();

			// Entrance animation
			tl.to(".grid-item", {
				keyframes: [
					{
						opacity: 0,
						duration: 0,
					},
					{
						opacity: 0.4,
						// rotate: "+=180",
						color: "#ffd057",
						scale: 2,
						duration: 0.6,
						stagger: {
							amount: 2,
							grid: grid,
							from: "center",
						},
					},
					{
						opacity: 0.2,
						// rotate: "+=180",
						color: "#fff",
						scale: 1,
						delay: -2,
						duration: 0.6,
						stagger: {
							amount: 3,
							grid: grid,
							from: "center",
						},
					},
				],
			});

			// Loop animation
			tl.to(".grid-item", {
				delay: 8,
				repeat: -1,
				repeatDelay: 8,
				keyframes: [
					{
						opacity: 0.4,
						rotate: "+=180",
						color: "#ffd057",
						scale: 2,
						duration: 0.6,
						stagger: {
							amount: 2,
							grid: grid,
							from: "center",
						},
					},
					{
						opacity: 0.2,
						rotate: "+=180",
						color: "#fff",
						scale:1,
						delay: -2,
						duration: 0.6,
						stagger: {
							amount: 3,
							grid: grid,
							from: "center",
						},
					},
				],
			});
		},
		{ scope: container }
	);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 935 425"
			className={styles.animatedGrid}
			id="grid"
			ref={container}
			opacity={0}
			style={{
				maskImage: "linear-gradient(black, transparent)",
			}}
		>
			<g className="grid-group">
				{[...Array(grid[0])].map((_, i) => {
					return [...Array(grid[1])].map((_, j) => {
						return (
							<text
								key={i + j}
								x={j * 32}
								y={i * 32}
								fill="currentColor"
								opacity="0.6"
								fontSize="6"
								
								
								className="grid-item"
							>
								{"*"}
							</text>
						);
					});
				})}
			</g>
		</svg>
	);
}

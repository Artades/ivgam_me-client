"use client";

import React from "react";
import styles from "./Header.module.scss";
import { navigation as nav } from "@/config/navigation";
import { useRouter } from "next/navigation";
import { SquareDashedBottomCode, Text } from "lucide-react";
import { useMenuFacade } from "@/facades/useMenuFacade";


const Header = () => {
	const router = useRouter();
	const handleLink = (link: string): void => {
		router.push(link);
	};

	const {toggleMenu} = useMenuFacade();

	return (
		<header className={styles.header}>
			<div className={styles.headerInner}>
				<div className={styles.headerLogo}>
					<h2>
						Artyom <span>Galay</span>
						<SquareDashedBottomCode />
					</h2>
				</div>
				<ul className={styles.headerNav}>
					{nav.map((item) => (
						<li
							onClick={() => handleLink(item.link)}
							key={item.id}
							className={styles.navItem}
						>
							{item.name}
						</li>
					))}
				</ul>
				<div className={styles.headerMobileMenuBtn} onClick={toggleMenu}>
					<Text />
				</div>
			</div>
		</header>
	);
};

export default Header;

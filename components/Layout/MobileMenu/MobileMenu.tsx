"use client";

import React from "react";
import styles from "./MobileMenu.module.scss";
import { SquareDashedBottomCode, X } from "lucide-react";
import { navigation as nav } from "@/config/navigation";
import { useRouter } from "next/navigation";
import { useMenuFacade } from "@/facades/useMenuFacade";

const MobileMenu = () => {
	const { isOpen, toggleMenu } = useMenuFacade();
	const router = useRouter();

	const handleLink = (link: string): void => {
		router.push(link);
		toggleMenu(); 
	};

	return (
		<nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
			<div className={styles.menuOverlay} onClick={toggleMenu}></div>
			<div className={styles.menuInner}>
				<div className={styles.menuLogo}>
					<h2>
						Artyom <span>Galay</span>
						<SquareDashedBottomCode />
					</h2>
					<div className={styles.menuCloseBtn} onClick={toggleMenu}>
						<X />
					</div>
				</div>

				<ul className={styles.menuNav}>
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
			</div>
		</nav>
	);
};

export default MobileMenu;

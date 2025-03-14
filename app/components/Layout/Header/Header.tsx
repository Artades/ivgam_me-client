"use client";

import React from "react";
import styles from "./Header.module.scss";
import { navigation as nav } from "@/config/navigation";
import { useRouter } from "next/navigation";
import { SquareDashedBottomCode, Text } from "lucide-react";
import { getContent } from "@/utils/getContent";
import LanguageSelect from "./LanguageSelect/LanguageSelect";
import MobileMenuButton from "./MobileMenuButton/MobileMenuButton";

interface HeaderProps {
	content: Awaited<ReturnType<typeof getContent>>["navigation"];
}
const Header = ({ content }: HeaderProps) => {
	const router = useRouter();
	const handleLink = (link: string): void => {
		router.push(link);
	};

	

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
							{content[item.key]}
						</li>
					))}
				</ul>

				<div className={styles.headerActions}>
					<LanguageSelect />
					<MobileMenuButton />
				</div>
			</div>
		</header>
	);
};

export default Header;

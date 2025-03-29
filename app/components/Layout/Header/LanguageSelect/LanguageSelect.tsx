"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./LanguageSelect.module.scss";
import { Languages } from "lucide-react";
import Button from "@/app/components/ui/Button/Button";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import { useParams, useRouter } from "next/navigation";

const languages = [
	{ code: "en", label: "English" },
	{ code: "ru", label: "Русский" },
	{ code: "es", label: "Español" },
];

const LanguageSelect = () => {
	const params = useParams();
	const router = useRouter();
	const locale = params?.locale as string | undefined;

	const [selectedLanguage, setSelectedLanguage] = useState(
		languages.find((l) => l.code === locale) ?? languages[0]
	);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	
	useEffect(() => {
		if (locale) {
			setSelectedLanguage(
				languages.find((l) => l.code === locale) ?? languages[0]
			);
		}
	}, [locale]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleChangeLanguage = useCallback(
		(option: { code: string }) => {
			const newLanguage = languages.find((l) => l.code === option.code);
			if (!newLanguage) return;

			setSelectedLanguage(newLanguage);
			router.replace(`/${newLanguage.code}`);

			toggleDropdown();
		},
		[router]
	);

	return (
		<div className={styles.languageSelect} ref={dropdownRef}>
			<Button
				size={EButtonSizes.SMALL}
				variant={EButtonVariants.OUTLINE}
				onClick={toggleDropdown}
			>
				<Languages />
			</Button>

			{isOpen && (
				<div className={styles.dropdown}>
					{languages.map((lang) => (
						<div
							key={lang.code}
							className={styles.option}
							onClick={() => handleChangeLanguage(lang)} 
						>
							<span className={styles.label}>{lang.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSelect;

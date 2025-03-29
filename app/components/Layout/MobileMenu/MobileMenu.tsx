"use client";

import React from "react";
import styles from "./MobileMenu.module.scss";
import { SquareDashedBottomCode, X } from "lucide-react";
import { navigation as nav } from "@/config/navigation";
import { useMenuFacade } from "@/facades/useMenuFacade";
import { scrollToSection } from "@/helpers/scroll";
import { TContent } from "@/types/content";

type MobileMenuProps = TContent<"navigation">;
const MobileMenu = ({ content }: MobileMenuProps) => {
  const { isOpen, toggleMenu } = useMenuFacade();

  const handleLink = (key: string) => {
    toggleMenu();

    scrollToSection(key);
  };

  return (
    <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
      <div className={styles.menuInner}>
        <div className={styles.menuLogo}>
          <h2>
            Ivgam <span>Me</span>
            <SquareDashedBottomCode />
          </h2>
          <div className={styles.menuCloseBtn} onClick={toggleMenu}>
            <X />
          </div>
        </div>

        <ul className={styles.menuNav}>
          {nav.map((item) => (
            <li
              onClick={() => handleLink(item.key)}
              key={item.id}
              className={styles.navItem}
            >
              {content[item.key]}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileMenu;

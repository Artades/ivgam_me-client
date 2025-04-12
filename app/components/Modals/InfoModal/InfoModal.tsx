"use client";

import React from "react";
import styles from "./InfoModal.module.scss";
import { TContent } from "@/types/content";
import Image from "next/image";
import { useInfoModalFacade } from "@/facades/useInfoModalFacade";
import { clsx } from "clsx"; 
import Button from "../../ui/Button/Button";
import {XIcon} from "lucide-react"
type InfoModalProps = TContent<"info">;

const InfoModal = ({ content }: InfoModalProps) => {
  const { stats } = content;
  const { isOpen, toggleModal } = useInfoModalFacade();
  
  return (
    <>
      {isOpen && (
        <div
          className={clsx(styles.infoModalOverlay, {
            [styles.infoModalOverlayActive]: isOpen, 
          })}
          onClick={toggleModal} 
        />
      )}
      <div
        className={clsx(styles.infoModal, {
          [styles.infoModalOpened]: isOpen, 
        })}
      >
        <nav className={styles.infoModalClose} onClick={toggleModal}><XIcon /></nav>
        <div className={styles.infoModalInner}>
          <div className={styles.infoModalHeader}>
            <Image
              className={styles.infoModalAvatar}
              src="/images/me2.jpg"
              alt="Avatar"
              width={1000}
              height={1000}
            />
            <h2 className={styles.infoModalHeading}>Artyom Galay</h2>
            <p className={styles.infoModalDescription}>{content.status}</p>
          </div>

          <div className={styles.infoModalContent}>
            {Object.entries(stats).map(([key, value]) => {
              if (typeof value === "object" && value.name && value.value) {
                return (
                  <div key={key} className={styles.infoModalItem}>
                    <span className={styles.infoModalItemName}>{value.name}</span>
                    <div className={styles.infoModalItemFiller}/>
                    <span className={styles.infoModalItemValue}>{value.value}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <Button onClick={toggleModal}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default InfoModal;

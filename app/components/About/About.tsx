import React from "react";
import styles from "./About.module.scss";
import { TContent } from "@/types/content";
import {
  Bike,
  Dumbbell,
  FolderCodeIcon,
  Gamepad2,
  MountainSnow,
  Pin,
  Telescope,
} from "lucide-react";

type AboutProps = TContent<"about">;

const icons: Record<string, React.ElementType> = {
  MountainSnow,
  Bike,
  Gamepad2,
  Telescope,
  Dumbbell,
  Pin,
  FolderCodeIcon,
};

const About = ({ content }: AboutProps) => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutHeader}>
        <div className={styles.aboutHeaderHeading}>
          <Pin />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.aboutHeaderDescription}>{content.description}</p>
      </div>

      <div className={styles.aboutInner}>
        <div className={styles.aboutTextBlock}>
          <p className={styles.aboutText}>{content.text}</p>
        </div>

        <div className={styles.aboutInterestsBlock}>
          <h3 className={styles.sectionTitle}>{content.interestsHeading}</h3>
          <div className={styles.aboutInterests}>
            {Object.values(content.interests).map((interest, i) => {
              const Icon = icons[interest.icon];
              return (
                <div className={styles.aboutInterest} key={i}>
                  <div className={styles.aboutInterestIconWrapper}>
                    {Icon && (
                      <Icon className={styles.aboutInterestIconWrapperIcon} />
                    )}
                  </div>
                  <div>
                    <h4 className={styles.aboutInterestName}>
                      {interest.name}
                    </h4>
                    <p className={styles.aboutInterestValue}>
                      {interest.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.aboutFactsWrapper}>
          <h3 className={styles.sectionTitle}>{content.factsHeading}</h3>
          <div className={styles.aboutFacts}>
            {Object.values(content.facts).map((fact, i) => (
              <div className={styles.aboutFactsItem} key={i}>
                <span className={styles.aboutFactsItemValue}>{fact.value}</span>
                <span className={styles.aboutFactsItemName}>{fact.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

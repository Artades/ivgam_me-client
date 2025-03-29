import React from 'react';
import styles from './Socials.module.scss';
import Image from 'next/image';

const socials: Record<string, { icon: string; link: string }> = {
  linkedIn: {
    icon: '/icons/socials/linkedin.svg',
    link: 'https://www.linkedin.com/in/artyom-galay-752629359/',
  },
  insta: {
    icon: '/icons/socials/insta.svg',
    link: 'https://instagram.com/_ive_got_a_migraine',
  },
  git: {
    icon: '/icons/socials/git.svg',
    link: 'https://github.com/Artades',
  },
  telegram: {
    icon: '/icons/socials/telegram.svg',
    link: 'https://t.me/ive_got_a_migraine',
  },
  twitter: {
    icon: '/icons/socials/twitter.svg',
    link: 'https://twitter.com/',
  },
};

const Socials = () => {
  return (
    <div className={styles.socialsGrid}>
      {Object.entries(socials).map(([key, { icon, link }]) => (
        <a
          key={key}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialsGridItem}
        >
          <Image src={icon} alt={`${key} icon`} width={24} height={24} />
        </a>
      ))}
    </div>
  );
};

export default Socials;

import React from 'react';
import styles from './TestimonialCard.module.scss';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Testimonial } from '@/types/testimonial';

const TestimonialCard = ({ name, position, text, avatar, rate }: Testimonial) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatar}>
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className={styles.avatarImg}
          />
        </div>
        <div>
          <h4 className={styles.name}>{name}</h4>
          <p className={styles.position}>{position}</p>
        </div>
      </div>

      <p className={styles.text}>“{text}”</p>

      <div className={styles.stars}>
        {Array.from({ length: rate }).map((_, i) => (
          <Star key={i} className={styles.star} fill="currentColor" />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;

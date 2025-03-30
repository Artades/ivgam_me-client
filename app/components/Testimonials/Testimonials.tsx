import React from "react";
import styles from "./Testimonials.module.scss";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import { MessageCircleCode, StarHalf } from "lucide-react";
import { TContent } from "@/types/content";

type TestimonialsProps = TContent<"testimonials">;

const Testimonials = ({ content }: TestimonialsProps) => {
  return (
    <section id={"testimonials"} className={styles.testimonials}>
      <div className={styles.testimonialsHeader}>
        <div className={styles.testimonialsHeaderHeading}>
          <MessageCircleCode />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.testimonialsHeaderDescription}>
          {content.description}
        </p>
      </div>
    </section>
  );
};

export default Testimonials;

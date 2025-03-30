"use client";

import React from "react";
import styles from "./Testimonials.module.scss";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import { ChevronLeft, ChevronRight, MessageCircleCode } from "lucide-react";
import { TContent } from "@/types/content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Testimonial } from "@/types/testimonial";
import Button from "../ui/Button/Button";
import { EButtonVariants } from "@/types/ui";

type TestimonialsProps = TContent<"testimonials"> & {
  testimonials: Testimonial[];
};

const Testimonials = ({ content, testimonials }: TestimonialsProps) => {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.testimonialsHeader}>
        <div className={styles.testimonialsHeaderHeading}>
          <MessageCircleCode />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.testimonialsHeaderDescription}>
          {content.description}
        </p>
      </div>

      <div className={styles.testimonialsInner}>
        <Swiper
          className={styles.testimonialsSlider}
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: "#custom-next",
            prevEl: "#custom-prev",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className={styles.testimonialsSlide}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navigationButtons}>
          <Button variant={EButtonVariants.CIRCLED} id="custom-prev">
            <ChevronLeft />
          </Button>

          <Button id="custom-next" variant={EButtonVariants.CIRCLED}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

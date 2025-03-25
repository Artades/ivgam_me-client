"use client";

import { TContent } from "@/types/content";
import styles from "./Contact.module.scss";
import React from "react";
import { Building2, Mail, PhoneCall, User } from "lucide-react";
import Input from "../ui/Input/Input";
import Image from "next/image";
import Button from "../ui/Button/Button";
import { EButtonSizes, EButtonVariants } from "@/types/ui";

type ContactProps = TContent<"contact">;

const Contact = ({ content }: ContactProps) => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactHeader}>
        <div className={styles.contactHeaderHeading}>
          <PhoneCall />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.contactHeaderDescription}>{content.description}</p>
      </div>

      <div className={styles.contactInner}>
        <div className={styles.contactImageWrapper}>
          <Image src="/images/aurora.jpeg" alt="Contact" fill />
        </div>

        <div className={styles.contactFormWrapper}>
          <h3>Fill the form</h3>
  
          <form className={styles.contactForm}>
            <Input label="Full name" placeholder="John Doe" required icon={<User/>} />
            <Input label="Email" placeholder="you@example.com" type="email" icon={<Mail/>} required />

            <Input label="Company" placeholder="Wallmart" type="email" required icon={<Building2/>}/>
            <Input label="Email" placeholder="you@example.com" type="email" icon={<Mail/>} required />
            {/* <TextArea /> */}

            <Button
              variant={EButtonVariants.PRIMARY}
              size={EButtonSizes.DEFAULT}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

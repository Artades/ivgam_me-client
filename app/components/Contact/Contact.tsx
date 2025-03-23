import { TContent } from "@/types/content";
import styles from "./Contact.module.scss";
import React from "react";
import { PhoneCall } from "lucide-react";


type ContactProps = TContent<"contact">;


const Contact = ({ content }: ContactProps) => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactHeader}>
        <div className={styles.contactHeaderHeading}>
          <PhoneCall />
          <h2>{content.heading}</h2>
        </div>
        <p className={styles.contactHeaderDescription}>
          {content.description}
        </p>
      </div>

   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt at nulla ex tenetur sequi expedita, reprehenderit quisquam placeat consequatur possimus ipsa et debitis non vitae aperiam adipisci consectetur eos a? Facere repudiandae incidunt officiis! Voluptatum, qui mollitia! Distinctio tenetur est recusandae ipsa deserunt maxime amet illum! Debitis minima eligendi autem expedita, quae pariatur eius, asperiores facere delectus maiores cum ratione officiis reiciendis non, consequatur dolore. Unde nesciunt ducimus totam non doloremque assumenda accusamus a cumque voluptatibus possimus amet, eum dolorem animi id facilis sit perferendis numquam quaerat dignissimos inventore mollitia ea laboriosam porro! Est dignissimos distinctio, omnis, incidunt sequi quod magni blanditiis autem quo laborum perspiciatis consequuntur beatae dolorem cum accusantium voluptatibus neque laboriosam laudantium iusto mollitia animi magnam. Aliquid minima cum sapiente provident ad dolorem incidunt laudantium voluptatem nihil enim recusandae velit nam, saepe minus eligendi laboriosam magni accusantium nobis voluptate ipsam quod aperiam facilis. Velit, blanditiis aliquid repellendus tempore culpa voluptatem illum ea molestiae magni? Consequuntur iste, enim odit officiis, modi praesentium atque quo incidunt nihil tempora labore cupiditate architecto magni laudantium soluta placeat? Laudantium dolorum autem quasi. Eveniet vel eligendi consectetur ullam? Culpa expedita animi ipsam aliquid, accusantium excepturi accusamus error nulla nesciunt dolores fugit id delectus!</p>
    </section>
  );
};

export default Contact;

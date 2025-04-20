"use client";

import { useState } from "react";
import { TContent } from "@/types/content";
import styles from "./Contact.module.scss";
import { Building2, Mail, PhoneCall, User } from "lucide-react";
import Input from "../ui/Input/Input";
import Image from "next/image";
import Button from "../ui/Button/Button";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import TextArea from "../ui/TextArea/TextArea";
import { z } from "zod";
import Socials from "./Socials/Socials";
import { ISendEmailDTO } from "@/types/email";
import { useToastFacade } from "@/facades/useToastFacade"; 

type ContactProps = TContent<"contact">;

const formDataSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1).max(15),
  message: z.string().min(1).max(200),
});

type FormData = z.infer<typeof formDataSchema>;

const Contact = ({ content }: ContactProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [loading, setLoading] = useState<boolean>(false);
  const { showSuccess, showError, showLoading } = useToastFacade(); 

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    showLoading("Отправка...", "Пожалуйста, подождите.");

    const result = formDataSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as keyof FormData;
        fieldErrors[path] = content.form.fields[path].error;
      }

      setErrors(fieldErrors);
      showError("Ошибка валидации", "Пожалуйста, проверьте правильность ввода.");
      setLoading(false);
      return;
    }

    const emailData: ISendEmailDTO = {
      sender: formData.email,
      subject: `Ivgam.Me - Новое сообщение от ${formData.fullName}`,
      message: `
        <p><strong>Имя:</strong> ${formData.fullName}</p>
        <p><strong>Почта:</strong> ${formData.email}</p>
        <p><strong>Компания:</strong> ${formData.company}</p>
        <p><strong>Сообщение:</strong><br/>${formData.message}</p>
      `,
    };

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке");
      }

      showSuccess("Сообщение отправлено", "Я свяжусь с вами в ближайшее время.");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      showError("Ошибка", "Что-то пошло не так. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

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
          <Image src="/images/contact.jpg" alt="Contact" fill />
          <Socials />
        </div>

        <div className={styles.contactFormWrapper}>
          <h3>{content.form.title}</h3>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <Input
              label={content.form.fields.fullName.label}
              placeholder={content.form.fields.fullName.placeholder}
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
              icon={<User />}
            />
            <Input
              label={content.form.fields.email.label}
              placeholder={content.form.fields.email.placeholder}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              icon={<Mail />}
              type="email"
            />
            <Input
              label={content.form.fields.company.label}
              placeholder={content.form.fields.company.placeholder}
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              error={errors.company}
              icon={<Building2 />}
            />
            <TextArea
              label={content.form.fields.message.label}
              placeholder={content.form.fields.message.placeholder}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={errors.message}
            />

            <Button
              variant={EButtonVariants.PRIMARY}
              size={EButtonSizes.DEFAULT}
              type="submit"
              disabled={loading}
            >
              {loading ? "Отправка..." : content.form.button.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import Intro from "@/app/components/Intro/Intro";
import { Locale } from "@/i18n";
import { getContent } from "@/utils/getContent";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Technologies from "../components/Technologies/Technologies";
import Contact from "../components/Contact/Contact";
import Testimonials from "../components/Testimonials/Testimonials";
import { getTestimonials } from "@/actions/testimonials";

export default async function Page(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;

  const content = await getContent(locale);

  // const testimonials = await getTestimonials();
  return (
    <>
      <Intro content={content["intro"]} />
      <Projects content={content["projects"]} />
      <About content={content["about"]} />
      <Technologies content={content["technologies"]} />
      <Contact content={content["contact"]} />
      {/* <Testimonials content={content["testimonials"]} testimonials={testimonials} /> */}
    </>
  );
}

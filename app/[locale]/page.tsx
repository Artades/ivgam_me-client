import Intro from "@/app/components/Intro/Intro";
import { Locale } from "@/i18n";
import { getContent } from "@/utils/getContent";
import Projects from "../components/Projects/Projects";
import About from "../components/About/About";
import Technologies from "../components/Technologies/Technologies";
import Contact from "../components/Contact/Contact";
import Services from "../components/Services/Services";

export default async function Page(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;

  const content = await getContent(locale);

  return (
    <>
      <Intro content={content["intro"]} />
      <Services content={content["services"]} />
      <Projects content={content["projects"]} />
      <Technologies content={content["technologies"]} />
      <About content={content["about"]} />
      <Contact content={content["contact"]} />
    </>
  );
}

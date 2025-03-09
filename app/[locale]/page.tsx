import Intro from "@/app/components/Intro/Intro";
import { Locale } from "@/i18n";
import { getContent } from "@/utils/getContent";
import Projects from "../components/Projects/Projects";

export default async function Page(props: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await props.params;

	const content = await getContent(locale);
	return (
		<>
			{/* <Intro content={content["intro"]} /> */}
			<Projects content={content["projects"]} />
			
		</>
	);
}

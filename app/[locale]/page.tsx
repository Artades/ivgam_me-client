import Intro from "@/components/Intro/Intro";
import { Locale } from "@/i18n";
import { getContent } from "@/utils/getContent";

export default async function Page(props: {
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await props.params;

	const content = await getContent(locale);
	return (
		<>
			<Intro content={content["home"]} />
		</>
	);
}

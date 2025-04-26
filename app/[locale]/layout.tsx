import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.scss";
import Container from "@/app/components/Layout/Container/Container";
import BackgroundEffect from "@/app/components/Layout/BackgroundEffect/BackgroundEffect";
import Header from "@/app/components/Layout/Header/Header";
import MobileMenu from "@/app/components/Layout/MobileMenu/MobileMenu";
import { i18n, type Locale } from "../../i18n";
import { getContent } from "@/utils/getContent";
import InfoModal from "../components/Modals/InfoModal/InfoModal";
import Toast from "../components/ui/Toast/Toast";

const notoSans = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export async function generateMetadata(
  args: { params: { locale: Locale } }
): Promise<Metadata> {
  const locale = args.params.locale;

  const content = await getContent(locale);

  const title = content["seo"]?.title ?? "Ivgam Me";
  const description =
    content["seo"]?.description ?? "Artyom's Galay Personal Portfolio";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      locale: locale,
      type: "website",
      url: `https://ivgam.me/${locale}`,
      images: [
        {
          url: "https://ivgam.me/images/me.jpg",
          alt: "Artyom Galay",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/images/me.jpg", "/images/contact.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Promise<Locale> };
}) {
  const locale = await params.locale;

  const content = await getContent(locale);
  return (
    <html lang={locale}>
      <body className={notoSans.className}>
        <Container>
          <Header content={content["navigation"]} />
          <BackgroundEffect />
          <MobileMenu content={content["navigation"]} />
          <InfoModal content={content["info"]} />
          {children}
        </Container>
        <Toast />
      </body>
    </html>
  );
}

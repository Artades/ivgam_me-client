import Image from "next/image";
import styles from "../page.module.css"
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  // Extract the navigation object keys from the translations
  const navigationKeys = Object.keys(t.raw("navigation"));
  return (
    <main className={styles.main}>
        <>
      <nav>
        <ul>
          {navigationKeys.map((key) => (
            <li key={key}>
              <a href={`#/${key}`}>{t(`navigation.${key}`)}</a>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <div>
          <aside>
            <h2>{t("title")}</h2>
            <p dangerouslySetInnerHTML={{ __html: t("description") }}></p>
          </aside>
        
        </div>
      </main>
    </>

    </main>
  );
}

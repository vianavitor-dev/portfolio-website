import type { TFunction } from "i18next";

type PortfolioPage = "about-me" | "projects";

type PageNavigationProps = {
  currentPage: PortfolioPage;
  onNavigate: (page: PortfolioPage) => void;
  t: TFunction<"default", unknown>;
  lang?: string;
  inert?: boolean;
};

export default function PageNavigation({currentPage, onNavigate, t, lang, inert}: PageNavigationProps) {
  return (
    <nav
      className="page-navigation"
      aria-label={t("navigation_label", {
        defaultValue: lang?.startsWith("pt") ? "Navegação principal" : "Main navigation"
      })}
      inert={inert}
    >
      <button
        type="button"
        className={`page-navigation-button${currentPage === "about-me" ? " is-active" : ""}`}
        aria-current={currentPage === "about-me" ? "page" : undefined}
        onClick={() => onNavigate("about-me")}
      >
        {t("navbtn_aboutme")}
      </button>
      <button
        type="button"
        className={`page-navigation-button${currentPage === "projects" ? " is-active" : ""}`}
        aria-current={currentPage === "projects" ? "page" : undefined}
        onClick={() => onNavigate("projects")}
      >
        {t("navbtn_projects")}
      </button>
    </nav>
  );
}

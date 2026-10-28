import type { TFunction } from "i18next";
import type { Dispatch, SetStateAction } from "react";

type PortfolioPage = "about-me" | "projects";

type PageNavigationProps = {
  currentPage: PortfolioPage;
  onNavigate: (page: PortfolioPage) => void;
  onPointerOver: Dispatch<SetStateAction<string>>;
  t: TFunction<"default", unknown>;
  lang?: string;
  inert?: boolean;
};

export default function PageNavigation({currentPage, onNavigate, onPointerOver, t, lang, inert}: PageNavigationProps) {
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
        onPointerOver={() => onPointerOver("about-me")}
        onPointerOut={() => onPointerOver("")}
        onClick={() => onNavigate("about-me")}
      >
        {t("navbtn_aboutme")}
      </button>
      <button
        type="button"
        className={`page-navigation-button${currentPage === "projects" ? " is-active" : ""}`}
        aria-current={currentPage === "projects" ? "page" : undefined}
        onPointerOver={() => onPointerOver("projects")}
        onPointerOut={() => onPointerOver("")}
        onClick={() => onNavigate("projects")}
      >
        {t("navbtn_projects")}
      </button>
    </nav>
  );
}

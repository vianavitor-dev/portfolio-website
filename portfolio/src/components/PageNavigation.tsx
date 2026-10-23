type PortfolioPage = "about-me" | "projects";

type PageNavigationProps = {
  currentPage: PortfolioPage;
  onNavigate: (page: PortfolioPage) => void;
};

export default function PageNavigation({
  currentPage,
  onNavigate,
}: PageNavigationProps) {
  return (
    <nav className="page-navigation" aria-label="Main navigation">
      <button
        type="button"
        className={`page-navigation-button${currentPage === "about-me" ? " is-active" : ""}`}
        aria-current={currentPage === "about-me" ? "page" : undefined}
        onClick={() => onNavigate("about-me")}
      >
        About Me
      </button>
      <button
        type="button"
        className={`page-navigation-button${currentPage === "projects" ? " is-active" : ""}`}
        aria-current={currentPage === "projects" ? "page" : undefined}
        onClick={() => onNavigate("projects")}
      >
        Projects
      </button>
    </nav>
  );
}

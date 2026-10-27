import { useEffect } from "react";
import type { ProjectCard } from "../common/PublicInterfaces";
import type { TFunction } from "i18next";

type ProjectsProps = {
  setSelectedProjectIndex: (index: number, trigger?: HTMLElement) => void;
  projectData: ProjectCard[];
  t: TFunction<"default", unknown>;
  lang?: string;
};

function Projects({ setSelectedProjectIndex, projectData, t, lang }: ProjectsProps) {
  const isPortuguese = lang?.startsWith("pt") ?? false;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedProjectIndex]);

  return (
    <section id="my-projects" aria-labelledby="projects-title">
      <h2 className="sub-title">{t("projects_subtitle")}</h2>
      <h1 className="title" id="projects-title">{t("projects_title")}</h1>
      <p>{t("projects_p1")}</p>
      <div className="card-container">
        <div className="card-rail">
          {projectData.map(({ header, shortDescription, imagesUrl, technologies }, index) => (
            <div
              role="button"
              tabIndex={0}
              className="card"
              key={header}
              onClick={(event) => setSelectedProjectIndex(index, event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedProjectIndex(index, event.currentTarget);
                }
              }}
              aria-label={t("projects_open_details", {
                project: header,
                defaultValue: isPortuguese
                  ? `Ver detalhes do projeto ${header}`
                  : `View details for ${header}`
              })}
            >
              <div className="image">
                <img
                  loading="lazy"
                  src={imagesUrl[0]}
                  alt={t("projects_card_image_alt", {
                    project: header,
                    defaultValue: isPortuguese
                      ? `Captura de tela do projeto ${header}`
                      : `${header} project screenshot`
                  })}
                />
              </div>

              <h3 className="title notranslate" translate="no">{header}</h3>
              <div className="body">
                <p>{shortDescription}</p>

                <div className="technologies-used-container">
                  <div className="technologies-used">
                    {technologies.slice(0, 4).map((item) => (
                      <span className="notranslate" translate="no" key={`p${index}#${item}`}>{item}</span>
                    ))}

                    {technologies.length > 4
                      ? <span className="more">+{technologies.length - 4}</span>
                      : null}
                  </div>
                </div>

                <div className="more-details">
                  <span>{t("projects_card_more_details") + "->"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

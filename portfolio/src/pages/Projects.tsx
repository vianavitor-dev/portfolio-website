import React, { useEffect } from "react";
import type {ProjectCard} from "../common/PublicInterfaces";
import type { TFunction } from "i18next";

function Projects(prop: {setSelectedProjectIndex: (index: number) => void, projectData:ProjectCard[], t: TFunction<"default", unknown>}) {
  //
  const setSelectedProjectIndex = prop.setSelectedProjectIndex;
  const projectData = prop.projectData;
  const ref = React.useRef<HTMLDivElement>(null);
  const t = prop.t;

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
        <div id="my-projects" ref={ref}>
          <h2 className="sub-title">{t("projects_subtitle")}</h2>
          <h1 className="title">{t("projects_title")}</h1>
          <p>
            {t("projects_p1")}
          </p>
          <div className="card-container">
            <div className="card-rail">
              {projectData.map(({ header, shortDescription, imagesUrl, technologies }, index) => (
                  <div
                    className="card"
                    key={header}
                    onClick={() => setSelectedProjectIndex(index)}
                  >
                    <div className="image">
                      <img
                      loading="lazy"
                      src={imagesUrl[0]}
                      alt={"First page of the " + header + " project"}
                    />
                    </div>

                    <h3 className="title">{header}</h3>
                    <div className="body">
                      <p>{shortDescription}</p>

                      <div className="technologies-used-container">
                        <div className="technologies-used">
                          {technologies
                          .slice(0, 4)
                          .map((item) => (
                            <span key={`p${index}#${item}`}>{item}</span>
                          ))}

                          {(technologies.length > 4) 
                          ? <span className="more">+{technologies.length - 4}</span> 
                          : null}
                        </div>
                      </div>

                      <div className="more-details">
                          <span>{t("projects_card_more_details") + "->"}</span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

  );
}

export default Projects;

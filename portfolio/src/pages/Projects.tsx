import React, { useEffect } from "react";
import type {ProjectCard} from "../common/PublicInterfaces";

function Projects(prop: {setSelectedProjectIndex: (index: number) => void, projectData:ProjectCard[]}) {
  //
  const setSelectedProjectIndex = prop.setSelectedProjectIndex;
  const projectData = prop.projectData;
  const ref = React.useRef<HTMLDivElement>(null);

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
          <h2 className="sub-title">| More projects coming soon!</h2>
          <h1 className="title">My Projects</h1>
          <p>
            Here are some of the projects I've worked on, where I've put my knowledge into practice, 
            explored new technologies, and worked through different challenges. Each project has helped me 
            improve my skills and learn something new along the way.
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
                          <span>More Details {"->"}</span>
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

import {} from "react";
import type {ProjectCard} from "../common/PublicInterfaces";

function Projects(prop: {setSelectedProjectIndex: any, projectData:ProjectCard[]}) {
  //
  const setSelectedProjectIndex = prop.setSelectedProjectIndex;
  const projectData = prop.projectData;
  return (
    <>
      <div className="main-container-content" id="my-projects-container">
        <div id="my-projects">
          <h2 className="sub-title">| More projects coming soon!</h2>
          <h1 className="title">My Projects</h1>

          <div className="card-container">
            <div className="card-rail">
              {projectData.map(({ header, shortDescription, imagesUrl, technologies }, index) => (
                  <div
                    className="card"
                    key={header}
                    onClick={() => setSelectedProjectIndex(index)}
                  >
                    <img
                      loading="lazy"
                      src={imagesUrl}
                      width={400}
                      height={250}
                      alt={"First page of the " + header + " project"}
                    />

                    <h3 className="title">{header}</h3>
                    <div className="body">
                      <p>{shortDescription}</p>

                      <div className="technologies-used">
                        {technologies.map((item) => (
                          <span key={`p${index}#${item}`}>#{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;

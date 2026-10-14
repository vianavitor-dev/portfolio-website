import type { ProjectCard } from "../common/PublicInterfaces";

export default function ProjectDetails(prop:{selectedProjectIndex:number, selectedProject: ProjectCard}) {
    const selectedProject = prop.selectedProject;
    const selectedProjectIndex = prop.selectedProjectIndex;

    return (
        <div id="project-details">
          <div className="project-details-header">
            <h2 className="tittle">{selectedProject.header}</h2>

            <div className="image-cards-rail">
              <div className="left-arrow"> {"<"} </div>
              {/* FIRST CARD */}
              <div className="image-cards" key={`p1#img1`}>
                <img
                  src="https://placehold.co/400x250"
                  alt={"First " + selectedProject.header + " screenshot page"}
                />
              </div>
              {/* SECOND CARD */}
              <div className="image-cards" key={`p1#img2`}>
                <img
                  src="https://placehold.co/400x250"
                  alt={"Second " + selectedProject.header + " screenshot page"}
                />
              </div>

              <div className="right-arrow"> {">"} </div>
            </div>
          </div>

          <div className="project-details-body">
            <p>{selectedProject.fullDescription}</p>

            <div className="technologies-used">
              {selectedProject.technologies.map((item) => (
                <span key={`pd${selectedProjectIndex}#${item}`}>#{item}</span>
              ))}
            </div>

            <div className="available-at">
              <span>
                <a href={"#deployed-at"}>Deployed On</a>
              </span>

              <span>
                <a href={"https://github.com/vianavitor-dev"}>Github</a>
              </span>
            </div>
          </div>
        </div>
    );
}
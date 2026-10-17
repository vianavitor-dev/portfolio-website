import type { ProjectCard } from "../common/PublicInterfaces";

export default function ProjectDetails(prop:{selectedProjectIndex:number, selectedProject: ProjectCard}) {
    const selectedProject = prop.selectedProject;
    const selectedProjectIndex = prop.selectedProjectIndex;

    return (
        <div id="project-details">
          <div className="project-details-header">
            <h1 className="title">{selectedProject.header}</h1>


            {/* TODO: USE AN CORROUSEL INSTEAD */}
            <div className="image-cards-rail">
              <div className="left-arrow arrows"> {"<"} </div>
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

              <div className="right-arrow arrows"> {">"} </div>
            </div>
          </div>

          <div className="project-details-body">
            <p>{selectedProject.fullDescription}</p>

            <h3 className="label">Technologies Used</h3>
            <div className="technologies-used">
              {selectedProject.technologies.map((item) => (
                <span key={`pd${selectedProjectIndex}#${item}`}>{item}</span>
              ))}
            </div>

            <div className="available-at">
              <span>
                <a href={"#deployed-at"}>Visit Website</a>
              </span>

              <span>
                <a href={"https://github.com/vianavitor-dev"}>Github Repository</a>
              </span>
            </div>
          </div>
        </div>
    );
}
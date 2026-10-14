import { useEffect, useState } from "react";
import "./App.css";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import type {CommandInterface, ProjectCard} from "./common/PublicInterfaces";
import ProjectDetails from "./components/ProjectDetails";

function App() {

  const projectData: ProjectCard[] = [
    {
      header: "Project #1",
      imagesUrl: "https://placehold.co/400x250",
      shortDescription:
        "This project aims to make a better world by providing a \
                way to remove the PT from Brazil, and stuff like that",
      fullDescription: "This is the full description of Project #1",
      technologies: ["Java"],
    },
    {
      header: "Project #2",
      imagesUrl: "https://placehold.co/400x250",
      shortDescription:
        "This project aims to make a better world by providing a \
                way to remove the PT from Brazil, and stuff like that",
      fullDescription: "This is the full description of Project #2",
      technologies: ["Java", "HTML", "CSS", "Javascript"],
    },
    {
      header: "Project #3",
      imagesUrl: "https://placehold.co/400x250",
      shortDescription:
        "This project aims to make a better world by providing a \
                way to remove the PT from Brazil, and stuff like that",
      fullDescription: "This is the full description of Project #1",
      technologies: [
        "Java",
        "JUnit",
        "Spring",
        "Spring Security",
        "Docker",
        "MySQL",
        "HMTL",
        "CSS",
        "Javascript",
        "Redis",
      ],
    },
  ];

  const page = "projects";
  const [currentSection, setCurrentSection] = useState(page);

  const [cmdText, setCmdText] = useState("");
  const [cmdList, setCmdList] = useState([
    { isCommand: true, text: page },
  ]);

  const handleCmdListChange = (action: "remove" | "add", isCommand = true) => {
    switch (action) {
      case "add":{
        const cmd = {isCommand: isCommand, text: cmdText};

        setCmdList([...cmdList, cmd]);
        break;
      }

      case "remove":
        setCmdList([cmdList[-1]]);
        break;
      
      default:
        throw new Error("Invalid action passed: " + action);
    }
  }

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
  const renderCurrentSectionPage = () => {
    switch (currentSection) {
      case "about-me":
        return <AboutMe 
                  onPointerOverCallBack={setCmdText} 
                  onClickCallBack={handleCmdListChange}
                  onPointerOutCallBack={setCmdText}
                />
      case "projects": 
        return <Projects 
                  setSelectedProjectIndex={setSelectedProjectIndex}   
                  projectData={projectData}
                />
      // case "skills":
    }
  }

   useEffect(() => {
    if (selectedProjectIndex < 0) return;

    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, [selectedProjectIndex]);


const RenderSelectedProject = () => {
    const selectedProject = projectData[selectedProjectIndex];

    return (<>
      <div
        className="shadow-curtain"
        onClick={() => setSelectedProjectIndex(-1)}
      ></div>

      <ProjectDetails 
        selectedProject={selectedProject} 
        selectedProjectIndex={selectedProjectIndex}
      /></>)
  };


  const createCmd = ({isCommand, text}: CommandInterface, index: number) => {
    return isCommand ? (
      <div className="line" key={index}>
        <span className="user-at-machine">guest@portfolio:</span>
        <span className="user-at-machine-symbol">~$</span>
        <span className="command">{text}</span>
      </div>
    ) : (
      <div className="line" key={index}>
        <span className="response successful">Page loaded successfuly! </span>
      </div>
    );
  }

  return (
    <>
      <div id="main-container">
        <div className="main-container-content" id="terminal">
          {
            // generate commands
            cmdList
            .slice(-10)
            .map((item, index) => createCmd(item, index))
          }

          <div className="line current">
            <span className="user-at-machine">guest@portfolio:</span>
            <span className="user-at-machine-symbol">~$</span>
            <span className="command">{cmdText}</span>
          </div>
        </div>

        { renderCurrentSectionPage() }
      </div>

      {(selectedProjectIndex != -1) ? RenderSelectedProject() : null}
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import type { CommandInterface, ProjectCard } from "./common/PublicInterfaces";
import ProjectDetails from "./components/ProjectDetails";
import useIsVisible from "./hooks/useIsVisible";
import useProjectDataReader from "./hooks/useProjectDataReader";

function App() {
  const projectData: ProjectCard[] | null = useProjectDataReader();
  const [currentSection, setCurrentSection] = useState("about-me");

  const [cmdText, setCmdText] = useState("");
  const [cmdList, setCmdList] = useState([
    { isCommand: true, text: "about-me" },
  ]);

  const handleCmdListChange = (action: "remove" | "add", text = cmdText, isCommand = true) => {
    switch (action) {
      case "add": {
        const cmd = { isCommand: isCommand, text: text };

        setCmdList([...cmdList, cmd]);
        break;
      }

      case "remove":
        setCmdList([cmdList[-1]]);
        break;

      default:
        throw new Error("Invalid action passed: " + action);
    }
  };
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);

  const mainContainerContentRef = React.useRef<HTMLDivElement>(null);
  const nextPageBottomRef = React.useRef<HTMLDivElement>(null);
  const nextPageTopRef = React.useRef<HTMLDivElement>(null);

  const isNextPageBottomVisible = useIsVisible(nextPageBottomRef);
  const isNextPageTopVisible = useIsVisible(nextPageTopRef);

  const debounce = (func: (...args: any[]) => void, waitTime: number) => {
    let timeout;

    return (...args: any[]) => {
      const caller = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(caller, waitTime);
    }
  }

  const handleCurrentSectionChange = debounce(
      () => {
        switch (currentSection) {
          case "about-me":
            mainContainerContentRef.current?.scrollTo({
                top: 200,
                left: 0,
                behavior: "instant",
            });

            setCurrentSection("projects");
            break;
          case "projects":
            mainContainerContentRef.current?.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });

            setCurrentSection("about-me");
            break;
          default:
            throw new Error(`currentSection '${currentSection}' is invalid!`);
        }
  }, 500);

  useEffect(() => {
    if (isNextPageTopVisible || isNextPageBottomVisible) {
      handleCurrentSectionChange();
    }

  }, [isNextPageBottomVisible, isNextPageTopVisible]);


  const renderCurrentSectionPage = () => {
    switch (currentSection) {
      case "about-me":
        return (
          <AboutMe
            onPointerOverCallBack={setCmdText}
            onClickCallBack={handleCmdListChange}
            onPointerOutCallBack={setCmdText}
          />
        );
      case "projects":
        console.log("renderCurrentSectionPage: ", currentSection);  
        return (
          <Projects
            setSelectedProjectIndex={setSelectedProjectIndex}
            projectData={projectData}
          />
        );
      case "skills":
    }
  };

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
    return (
      <>
        <div
          className="shadow-curtain"
          onClick={() => setSelectedProjectIndex(-1)}
        ></div>

        <ProjectDetails
          selectedProject={selectedProject}
          selectedProjectIndex={selectedProjectIndex}
        />
      </>
    );
  };

  const createCmd = ({ isCommand, text }: CommandInterface, index: number) => {
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
  };

  return (
    <>
      <div id="main-container">
        <div className="main-container-content" id="terminal">
          {
            // generate commands
            cmdList.slice(-28).map((item, index) => createCmd(item, index))
          }

          <div className="line current">
            <span className="user-at-machine">guest@portfolio:</span>
            <span className="user-at-machine-symbol">~$</span>
            <span className="command">{cmdText}</span>
          </div>
        </div>

        <div className="main-container-content" ref={mainContainerContentRef}>
          <div className="nextPageTop" 
            ref={nextPageTopRef}
            style={{
              display: (currentSection === "projects") ? "block" : "none",
              marginBottom: "150px",
              // backgroundColor: "red",
              width: "100%",
              height: "20px",
              position: "relative",
              top: "0px",
              left: 0,
              overflow: "hidden"
            }}>
          </div>
          {renderCurrentSectionPage()}
          <div className="nextPageBottom" 
            ref={nextPageBottomRef}
            style={{
              display: (currentSection === "about-me") ? "block" : "none",
              marginTop: "100px",
              width: "100%",
              height: "20px",
              position: "relative",
              bottom: 0,
              left: 0,
              overflow: "hidden"
            }}>
          </div>
        </div>
      </div>

      {selectedProjectIndex != -1 ? RenderSelectedProject() : null}
    </>
  );
}

export default App;

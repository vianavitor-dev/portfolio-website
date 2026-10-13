import { useState } from "react";
import "./App.css";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";

function App() {
  const page = "projects";
  const [currentSection, setCurrentSection] = useState(page);

  const [cmdText, setCmdText] = useState("");
  const [cmdList, setCmdList] = useState([
    { isCommand: true, text: page },
  ]);

  interface CommandInterface {
    isCommand: boolean; 
    text: string
  }

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

  const renderCurrentSectionPage = () => {
    switch (currentSection) {
      case "about-me":
        return <AboutMe 
                  onPointerOverCallBack={setCmdText} 
                  onClickCallBack={handleCmdListChange}
                  onPointerOutCallBack={setCmdText}
                />
      case "projects": return <Projects />
      // case "skills":
    }
  }

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
    </>
  );
}

export default App;

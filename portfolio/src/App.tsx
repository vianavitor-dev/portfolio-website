import { useEffect, useRef, useState } from "react";
import "./App.css";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import type { CommandInterface, ProjectCard } from "./common/PublicInterfaces";
import ProjectDetails from "./components/ProjectDetails";
import useProjectDataReader from "./hooks/useProjectDataReader";
import PageNavigation from "./components/PageNavigation";
import { useTranslation } from "react-i18next";


function App() {
  const projectData: ProjectCard[] = useProjectDataReader();

  type Section = "about-me" | "projects";
  const [currentSection, setCurrentSection] = useState<Section>("about-me");

  const { t, i18n } = useTranslation('default');
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en';
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    document.title = t("document_title", {
      defaultValue: i18n.resolvedLanguage?.startsWith("pt")
        ? "Portfólio de Vitor Viana"
        : "Vitor Viana | Portfolio"
    });
  }, [i18n.resolvedLanguage, t]);

  const [cmdText, setCmdText] = useState("");
  const [cmdList, setCmdList] = useState<CommandInterface[]>([
    // Render Simple Introduction
    {isCommand: true, text: "cat intro.txt"},
    {isCommand: false, text: "+ ----------------------- +"},
    {isCommand: false, text: `| ${ t("terminal_greetings_header") } |`},
    {isCommand: false, text: "+ ======================= +"},
    {isCommand: false, text: "\n "},
    {isCommand: false, text: "\n "},
    {isCommand: false, text: "\n "},
    {isCommand: false, text: t("terminal_greetings_p1")},
    {isCommand: false, text: "\n "},
    {isCommand: false, text: t("terminal_greetings_p2")},
    // Render Current Page - About Me
    {isCommand: true, text: "about-me"},
    {isCommand: false, text: t("command_aboutme_p1")},
    {isCommand: false, text: "$CURRENT_PAGE = about-me"}
  ]);

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
  const projectCardTriggerRef = useRef<HTMLElement | null>(null);

  const handleSelectedProjectIndexChange = (index: number | null, func: (...args: never[]) => string[] = () => []) => {
    const i = index ?? -1;
    const resp:(...args: never[]) => string[] = 
    (func().length <= 0) 
    ? () => {
      if (i == -1) {
        return [
          "$PROJECT_SELECTED = " + i,
          t("command_hide_projectdetails"),
        ];
      }

      return [
          "$PROJECT_SELECTED = " + i,
          t("command_render_projectdetails") + i,
      ];
    }
    : func

    handleCmdListChange("projects --details " + i, true, resp);
    setSelectedProjectIndex(i);
  }

  const openProjectDetails = (index: number, trigger?: HTMLElement) => {
    if (trigger) projectCardTriggerRef.current = trigger;
    handleSelectedProjectIndexChange(index);
  };

  useEffect(() => {
    if (selectedProjectIndex !== -1) return;

    projectCardTriggerRef.current?.focus();
    projectCardTriggerRef.current = null;
  }, [selectedProjectIndex]);

  const navigateTo = (page: Section) => {
    handleSelectedProjectIndexChange(-1);
    setCurrentSection(page);
  }

  const handleCmdListChange = (text = cmdText, isCommand = true, auxResponse: (...args: never[]) => string[] = () => []) => {    
    const cmd = { isCommand: isCommand, text: text } as CommandInterface;
    const validCommands = "^(about-me|projects|cd github-profile|cd linkedin-profile|"
                          + "cd send-email|cd --projectIndex \\d+ github-repository-link|set-language pt|"
                          + "set-language en|projects --details [-]?\\d+|help|clear)$";

    let response: string[] = [];

    if (!cmd.text.match(validCommands)) {
      response = [
        t("command_invalid_p1"),
        `\n `,
        t("command_invalid_p2")
      ];
    } else {
      if (cmd.text === "clear") {
        setCmdList([]);
        return;
      }
      else if (cmd.text === "help") {
        response = [
          (i18n.resolvedLanguage == "en") ? "Command List: " : "Lista de Comandos: ",
          "\n ",
          "about-me",
          "projects",
          "help",
          "clear"
        ];
      }
      else if (cmd.text.match("^(cd send-email|cd linkedin-profile|cd github-profile)$") 
        && auxResponse().length <= 0) {

          response = [
            t("command_invalid_link")
          ];
      }
      else if (cmd.text.match("^(set-language \\w+)$")) {
        try {
          console.log("a");
          const lang: "pt" | "en" = cmd.text.slice(-2) as ("pt" | "en");
          
          i18n.changeLanguage(lang);

          response = [
            "$WEBSITE_LANGUAGE = " + lang,
            t("command_setlang_ok"),
          ];
        } catch(e) {
          console.log(e)

          response = [
            t("command_setlang_invalid_p1"),
            "\n",
            t("command_setlang_invalid_p2"),
          ]
        }
      }
      else if (cmd.text === "about-me" || cmd.text === "projects") {
        navigateTo(cmd.text);

        response = [
          `$CURRENT_PAGE = ${cmd.text}`,
          (cmd.text === "about-me") ? t("command_aboutme_p1") : t("command_projects_p1"), 
        ];
      }
    }

    const cmdResponse = [...response, ...auxResponse()].map((str) => (
      {isCommand: false, text: str} as CommandInterface
    ));

    setCmdList((previousCmdList) => 
      [...previousCmdList, cmd, ...cmdResponse]
    );
  };

  const textRef = useRef("");
  const currentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isWriting:boolean = false;

    const handleWritingCommand = (event:KeyboardEvent) => {
      if (isWriting === true) {
        if (event.key == "Enter") {
          handleCmdListChange(textRef.current, true)
          
          isWriting = false;
          textRef.current = "";
          setCmdText("");
          
          currentLineRef.current?.classList.remove("on-focus");
          return;
        }
      }
      
      if (isWriting === true && event.key != "\\") {
        textRef.current += event.key;
        setCmdText(textRef.current);
      }
      
      if (event.key == "\\") {
        isWriting = true;

        document.querySelectorAll("a").forEach((item) => item.blur());
        document.querySelectorAll("div").forEach((item) => item.blur());

        currentLineRef.current?.focus();
        currentLineRef.current?.classList.add("on-focus");
      } 
    };

    const handleDeleteText = (event: KeyboardEvent) => {
      if (event.key == "Escape") {
        textRef.current = "";
        setCmdText(textRef.current);

        isWriting = false;
        currentLineRef.current?.classList.remove("on-focus");
      }

      if (event.key == "Backspace") {
        textRef.current = textRef.current.substring(0, textRef.current.length -1);
        setCmdText(textRef.current);
      }
    }

    document.addEventListener("keypress", handleWritingCommand);
    document.addEventListener("keydown", handleDeleteText);

    return (() => {
      document.removeEventListener("keypress", handleWritingCommand);
      document.removeEventListener("keydown", handleDeleteText);
    })
  }, [cmdList, currentLineRef])

  const renderCurrentSectionPage = () => {
    switch (currentSection) {
      case "about-me":
        return (
          <AboutMe
            onPointerOver={setCmdText}
            onClick={handleCmdListChange}
            onPointerOut={setCmdText}
            t={t}
          />
        );
      case "projects":
        // console.log("renderCurrentSectionPage: ", currentSection);  
        return (
          <Projects
            setSelectedProjectIndex={openProjectDetails}
            onPointerOver={setCmdText}
            projectData={projectData}
            t={t}
            lang={i18n.resolvedLanguage}
          />
        );
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
          onClick={() => handleSelectedProjectIndexChange(-1)}
          aria-hidden="true"
        />

        <ProjectDetails
          selectedProject={selectedProject}
          selectedProjectIndex={selectedProjectIndex}
          onClose={() => handleSelectedProjectIndexChange(-1)}
          onPointerOverLink={setCmdText}
          onClickLink={handleCmdListChange}
          t={t}
          lang={i18n.resolvedLanguage}
        />
      </>
    );
  };

  const createCmd = ({ isCommand, text}: CommandInterface, index: number) => {
    return isCommand ? (
      <div className="line" key={index}>
        <span className="user-at-machine notranslate" translate="no">guest@portfolio:</span>
        <span className="user-at-machine-symbol notranslate" translate="no">~$</span>
        <span className="command notranslate" translate="no">{text}</span>
      </div>
    ) : (
      <div className="line" key={index}>
        <span className="response successful">{text}</span>
      </div>
    );
  };

  return (
    <>
      <main id="main-container" inert={selectedProjectIndex !== -1}>
        <div
          className="main-container-content"
          id="terminal"
          role="region"
          aria-label={t("terminal_region_label", {
            defaultValue: i18n.resolvedLanguage?.startsWith("pt")
              ? "Terminal interativo"
              : "Interactive terminal"
          })}
        >
          {
            // generate commands
            cmdList.slice(-20).map((item, index) => createCmd(item, index))
          }

          <div className="line current" ref={currentLineRef}>
            <span className="user-at-machine notranslate" translate="no">guest@portfolio:</span>
            <span className="user-at-machine-symbol notranslate" translate="no">~$</span>
            <span className="command notranslate" translate="no">{cmdText}</span>
          </div>
        </div>

        <section
          className="main-container-content"
          aria-label={t("portfolio_content_label", {
            defaultValue: i18n.resolvedLanguage?.startsWith("pt")
              ? "Conteúdo do portfólio"
              : "Portfolio content"
          })}
        >
          {renderCurrentSectionPage()}
        </section>
      </main>

      <PageNavigation 
        currentPage={currentSection} 
        onNavigate={handleCmdListChange} 
        onPointerOver={setCmdText}
        t={t}
        lang={i18n.resolvedLanguage}
        inert={selectedProjectIndex !== -1}
      />

      {selectedProjectIndex != -1 ? RenderSelectedProject() : null}
    </>
  );
}

export default App;

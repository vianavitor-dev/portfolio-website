import type { TFunction } from "i18next";
import { type SetStateAction } from "react";

interface AboutMeProps {
  onPointerOver: React.Dispatch<SetStateAction<string>>; 
  onClick: (text?: string, isCommand?: boolean, func?: (...args: never[]) => string[]) => void; 
  onPointerOut: React.Dispatch<SetStateAction<string>>;
  t: TFunction<"default", undefined>;
}

function AboutMe({onPointerOver, onClick, onPointerOut, t}: AboutMeProps) {
    const myContactsItems = [
        {
            value: "Email",
            cmdTxt: "cd send-email",
            url: "https://mail.google.com/mail?view=cm&fs=1&to=vianvitor232@gmail.com"
        },
        {
            value: "LinkedIn",
            cmdTxt: "cd linkedin-profile",
            url: "https://www.linkedin.com/in/vitor-hugo-marques-viana"
        },
        {
            value: "GitHub",
            cmdTxt: "cd github-profile",
            url: "https://github.com/vianavitor-dev"
        }
    ];

  return (
    <>
      <div id="about-me">
        <p id="greetings" className="sub-title">| { t("aboutme_greetings_subtitle") }</p>

        <h1 className="title">
          { t("aboutme_title_myname") } <span id="my-job">{ t("aboutme_title_myjob") }</span>
        </h1>

        <p>
          { t("aboutme_p1") }
        </p>
        <p>
          { t("aboutme_p2") }  
        </p>
      </div>

      <div id="my-tech-stack">
        <h2 className="title">{t("aboutme_stacks_title")}</h2>

        <div className="tech-item" id="main-techs">
          <h3 className="label">
            <span className="user-at-machine">guest@portfolio:</span>
            <span className="user-at-machine-symbol">~$</span>
              {t("aboutme_stacks_main")}
          </h3>

          <div className="simple-terminal-table">
            <span>Java</span> <span>Spring Boot</span> <span>Spring Security</span>
            <span>REST API</span> <span>Jason Web Token</span> <span>JUnit</span> 
            <span>Mockito</span> <span>MySQL</span> <span>Docker</span> 
            <span>Git</span> <span>GitHub Actions {"(CI/CD)"} </span>
          </div>
        </div>
        <div className="tech-item" id="extra-techs">
          <h3 className="label">
            <span className="user-at-machine">guest@portfolio:</span>
            <span className="user-at-machine-symbol">~$</span>
            {t("aboutme_stacks_complementary")}
          </h3>

          <div className="simple-terminal-table">
            <span>JavaScript</span> <span>React</span> <span>MuleSoft</span> 
            <span>PHP</span> <span>Python</span> <span>C#</span> <span>HTML</span>
            <span>CSS</span> 
          </div>
        </div>
      </div>

      <div id="my-contacts">
        {
            myContactsItems.map(({value, cmdTxt, url}, index) => (
                <span key={index} className="link">
                    <a key={"a#" + index} 
                      href={url} 
                      className="active"
                      onPointerOver={() => onPointerOver(cmdTxt)}
                      onClick={() => 
                        onClick(cmdTxt, true, () => [
                          t("aboutme_redirecting_command") + (value == "Email" ? "Gmail" : value) + "..."                     
                        ])}
                      onPointerOut={() => onPointerOut("")}
                      onAuxClick={() => 
                        onClick(cmdTxt, true, () => [
                          t("aboutme_redirecting_command") + (value == "Email" ? "Gmail" : value) + "..."                     
                        ])}
                    >
                      {value + " →"}
                    </a>
                </span>
            ))
        }
      </div>
    </>
  );
}

export default AboutMe;

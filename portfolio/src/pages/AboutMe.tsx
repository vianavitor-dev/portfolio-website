import {} from "react";

function AboutMe({onPointerOverCallBack, onClickCallBack, onPointerOutCallBack}) {
    const myContactsItems = [
        {
            value: "Email",
            cmdTxt: "cd send-email",
            url: "https://mail.google.com/mail?view=cm&fs=1&to=vianvitor232@gmail.com"
        },
        {
            value: "LikedIn",
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
    <div className="main-container-content" id="about-me-container">
      <div id="about-me">
        <p id="greetings" className="sub-title">| Welcome to my portfolio!</p>

        <h1 className="title">
          I'm Vitor a <span id="my-job">Software Developer</span>
        </h1>

        <p>
          Since I've started learning programming I always found myself doing
          personal projects to improve my skills, and this has been of great
          help! Searching for altenative methods, learning and including
          technologies that would enchance the project, attemping to make my
          code efficient, all of that are part of my core toughts when codding.
        </p>
        <p>
          On this portfolio I wraped up some relevant projects that I could
          learn with while building them, alongside with the technologies used
          and skills learned in this process.
        </p>
      </div>

      <div id="my-tech-stack">
        <h2 className="title">My Technologies Stack</h2>

        <div className="tech-item" id="main-techs">
          <h3 className="label">
            <span className="user-at-machine">guest@portfolio:</span>
            <span className="user-at-machine-symbol">~$</span>
              Main Stack
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
            Complementary Stack
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
                <span key={index}
                    className="link"
                    onPointerOver={() => onPointerOverCallBack(cmdTxt)}
                    onClick={() => onClickCallBack("add")}
                    onPointerOut={() => onPointerOutCallBack("")}
                    onAuxClick={() => onClickCallBack("add")}
                >
                    <a href={url}>
                        {value}
                    </a>
                </span>
            ))
        }
      </div>
    </div>
  );
}

export default AboutMe;

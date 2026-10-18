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
          I'm Vitor an <span id="my-job">Software Developer</span>
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

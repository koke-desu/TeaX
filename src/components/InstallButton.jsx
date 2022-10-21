import { userAgent } from "next/server";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../database/atom";
import { updateUserData } from "../database/basicFunc/firestore";

const InstallButton = () => {
  const [userData, setUserData] = useRecoilState(userAtom);
  const [promptEvent, setPromptEvent] = useState(null);
  useEffect(() => {
    // Capture event and defer
    alert;
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      setPromptEvent(e);
    });
  }, [setPromptEvent]);
  function presentAddToHome() {
    alert("1");

    if (promptEvent)
      promptEvent
        .prompt()
        .then((res) => {
          alert("2");
          console.log(res);
        })
        .catch((error) => {
          alert("3");
          console.log(`----> ${error}`);
        }); // Wait for the user to respond to the prompt
    promptEvent.userChoice.then((choice) => {
      alert("4");
      if (choice.outcome === "accepted") {
        alert("5");
        console.log("User accepted");
        let tmpUserData = { ...userData };
        tmpUserData.isInstalled = true;
        updateUserData(tmpUserData);
        setUserData(tmpUserData);
      } else {
        alert("6");
        console.log("User dismissed");
      }
    });
  }

  if (userData.isInstalled) return <></>;
  return (
    <a
      onClick={() => {
        alert("aaaaaaaa");
        presentAddToHome();
      }}
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "#e4c76f",
        position: "absolute",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: "100px",
        zIndex: 100,
      }}
    >
      <img src="/install.png" width="30px" height="40px" />
    </a>
  );
};

export default InstallButton;

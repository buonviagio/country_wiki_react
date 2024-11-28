import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";

function AboutPage() {
  const { arrayOfLanguage } = useContext(MyContext);
  return (
    <div>
      AboutPage
      <div>{console.log("arrayOfLanguage :>> ", arrayOfLanguage)}</div>
    </div>
  );
}

export default AboutPage;

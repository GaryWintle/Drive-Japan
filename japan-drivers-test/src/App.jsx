// import { useState } from "react";
import TestQuestions from "./TestQuestions.jsx";
import { useState } from "react";
import { questions } from "./questions.js";

import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <TestQuestions score={score} setScore={setScore} />
    </>
  );
}

export default App;

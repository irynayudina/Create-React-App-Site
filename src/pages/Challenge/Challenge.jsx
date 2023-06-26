import React, { useState, useEffect } from "react";
import './Challenge.scss'
import ResizingWrapper from "./ResizingWrapper";
import ChallengeInfo from "./ChallengeInfo";
import TestsInfo from "./TestsInfo";
import CodeEditorForChallenge from "./CodeEditorForChallenge";
const Challenge = () => {
  const data = {
    name: "String Reversal",
    difficulty: "Easy",
    author: "John Smith",
    creationDate: "May 1, 2023",
    description:
      "Given a string, write a function to reverse it. For example, the input string 'hello' should return 'olleh'.",
    topic: "Strings",
    tags: ["reverse", "string manipulation"],
    examples: [
      { input: "hello", output: "olleh" },
      { input: "coding is fun", output: "nuf si gnidoc" },
      { input: "", output: "" },
    ],
    points: 10,
    discussionCount: 5,
  };

  return (
    <div>
      <ResizingWrapper>
        <ChallengeInfo data={data} />
        <CodeEditorForChallenge />
        <TestsInfo />
      </ResizingWrapper>
    </div>
  );
};

export default Challenge;


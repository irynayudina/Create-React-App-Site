import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./CollabEditor.scss";
import JsRunner from "../../Editor/Syntax/JsRunner";
const CodeOutput = (props) => {
  const [cmdargs, setCmdargs] = useState("");
  const [userinp, setUserinp] = useState("");
  const [compiling, setCompiling] = useState(false);
  const code = props.code;
  const result = props.result;
  const setResult = props.setResult;
  const userinpHandler = (e) => {
    setUserinp(e.target.value);
  };
  const cmdHandler = (e) => {
    setCmdargs(e.target.value);
  };
  const [jsRun, setRunJs] = useState(0);

  return (
    <div>
      <Form.Label
        style={{
          float: "left",
          marginRight: "0.5rem",
          marginLeft: "0.5rem",
          marginTop: "0.2rem",
        }}
        className={`text ${props.theme}`}
      >
        CMD arguments
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={1}
        placeholder="command line"
        size="sm"
        value={cmdargs}
        onChange={cmdHandler}
        className={`inp ${props.theme} editor-input-up `}
      />
      <div className={`result collab-result ${props.theme}`}>
        {compiling ? (
          "compiling..."
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: result?.replace(/\n/g, "<br />"),
            }}
          ></div>
        )}
      </div>
      <div className="botInp">
        <Form.Label
          style={{ float: "left", margin: "0.5rem", marginTop: "0.5rem" }}
          className={`text ${props.theme}`}
        >
          Standard inputs
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="standard inputs separated by newline"
          size="md"
          value={userinp}
          onChange={userinpHandler}
          className={`inp ${props.theme} editor-input-down`}
        />
      </div>
      <JsRunner
        code={code}
        result={result}
        setResult={setResult}
        jsRun={jsRun}
      />
    </div>
  );
};

export default CodeOutput;

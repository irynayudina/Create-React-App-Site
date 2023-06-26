import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import './CollabEditor.scss'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import {
  sampleCodes,
  languageVersions,
  languages,
  languageExtensions,
} from "../../Editor/Syntax/EditorData.ts";
import { languageAutocompletions } from "../../Editor/Syntax/LanguageAutocompletions.js"; //"../../Syntax/LanguageAutocompletions";
const CodeEditor = (props) => {
  const [code, setCode] = useState(sampleCodes.javascript);
  const [language, setLangauge] = useState("javascript");
  const [viewUpdateState, setViewUpdateState] = useState();
  const [version, setVersion] = useState("0");
  const [versions, setVersions] = useState(languageVersions.javascript);
  const autocompleteOptions =
    language == "cpp14"
      ? languageAutocompletions["cpp"]
      : language == "cpp17"
      ? languageAutocompletions["cpp"]
      : language == "python3"
      ? languageAutocompletions["python2"]
      : languageAutocompletions[language];
  function myCompletions(context) {
    let word = context.matchBefore(/\w*/);
    if (word.from == word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: autocompleteOptions,
    };
  }
  const extensionsObj = autocompleteOptions
    ? [
        javascript({ jsx: true, ts: true }),
        autocompletion({
          override: [myCompletions],
        }),
      ]
    : [javascript({ jsx: true, ts: true })];
  const onChangeCM = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setViewUpdateState(viewUpdate);
  }, []);
  const [editorTheme, setEditorTheme] = useState(); //state libraries for react
  const languageHandler = (e) => {
    const lang = e.target.value;
    setLangauge(lang);
    setVersions(languageVersions[lang]);
    // setCode(sampleCodes[lang]);
    // setResult(defaultResult);
    // setCmdargs("");
    // setUserinp("");
    // setErrorLines([]);
  };
  const versionHandler = (e) => {
    setVersion(e.target.value);
  };
  return (
    <div>
      <Form.Select
        size="sm"
        style={{ width: "auto", float: "left" }}
        onChange={languageHandler}
        value={language}
        className={`select ${props.theme}`}
      >
        {Object.keys(languages).map((key) => (
          <option key={key} value={key}>
            {languages[key]}
          </option>
        ))}
      </Form.Select>
      <Form.Select
        size="sm"
        style={{ width: "auto" }}
        onChange={versionHandler}
        className={`select ${props.theme}`}
      >
        {versions?.map((v, i) => (
          <option key={i} value={i}>
            {v}
          </option>
        ))}
      </Form.Select>
      <CodeMirror
        value={code}
        mode={language}
        // theme={editorTheme}
        height="546px"
        className="overflow-hidden collab-editor"
        style={{ overflowX: "scroll", margin: "0.5rem 0 0.5rem 0" }}
        extensions={extensionsObj}
        onChange={onChangeCM}
      />
      <Button
        variant={props.theme == "lighttheme" ? "primary" : "dark"}
        className={`btn-editor btn-editor-${props.editorSize}`}
        // onClick={execute}
        style={{ marginBottom: "calc(1rem - 1px)" }}
      >
        Run
      </Button>
    </div>
  );
};

export default CodeEditor;

import React, { useState, useRef, useEffect } from "react";
import "./Editor.scss";
import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import JsRunner from "./Syntax/JsRunner";
import {
  sampleCodes,
  languageVersions,
  languages,
  languageExtensions,
} from "./Syntax/EditorData.ts";
import { languageAutocompletions } from "./Syntax/LanguageAutocompletions";
import SideBar from "./Sidebar/SideBar";
import ResizePannel from "./ResizePannel/ResizePannel";
import { handleDownloadClick, handleFileUpload } from "./WorkWithCodeFile";
import { moveErrors, parseErrors } from "./Syntax/WorkWithErrors";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { noctisLilac } from "@uiw/codemirror-theme-noctis-lilac";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { androidstudio } from "@uiw/codemirror-theme-androidstudio";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { aura } from "@uiw/codemirror-theme-aura";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { bespin } from "@uiw/codemirror-theme-bespin";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";
import { materialDark, materialLight } from "@uiw/codemirror-theme-material";
import { nord } from "@uiw/codemirror-theme-nord";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { calculateTimeDifference } from '../../elements/UpdateTimeCalculate'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Editor = (props) => {
  const defaultResult = `<p class="text-muted">&lt;--------Output of your program goes here --------&gt;</p>`;
  const [code, setCode] = useState(sampleCodes.javascript);
  const [language, setLangauge] = useState("javascript");
  const [version, setVersion] = useState("0");
  const [versions, setVersions] = useState(languageVersions.javascript);
  const [result, setResult] = useState(defaultResult);
  const [compiling, setCompiling] = useState(false);
  const [jsRun, setRunJs] = useState(0);
  const [cmdargs, setCmdargs] = useState("");
  const [userinp, setUserinp] = useState("");
  const [editorTheme, setEditorTheme] = useState(okaidia);
  const [viewUpdateState, setViewUpdateState] = useState();
  const [cmValuePrevious, setCmValuePrevious] = useState();
  const [expanded, setExpanded] = useState("expandedCustom-pannel");
  const [errorLines, setErrorLines] = useState([]);

  const [collabId, setCollabId] = useState("");
  const getCollab = async () => {
    try {
      const gotCollaboration = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/collab/projectId?associatedProject_id=${projectId}`
      );
      console.log(gotCollaboration);
      if (gotCollaboration?.data?.collabId) {
        setCollabId(`/documents/${gotCollaboration?.data?.collabId}`);
      } else {
        setCollabId('/collaboratory');
      }
    } catch (err) {
      console.log(err?.response?.data?.message || err.error);
    }
  };

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

  const userinpHandler = (e) => {
    setUserinp(e.target.value);
  };
  const cmdHandler = (e) => {
    setCmdargs(e.target.value);
  };
  const onChangeCM = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setViewUpdateState(viewUpdate);
  }, []);
  const languageHandler = (e) => {
    const lang = e.target.value;
    setLangauge(lang);
    setVersions(languageVersions[lang]);
    setCode(sampleCodes[lang]);
    setResult(defaultResult);
    // setCmdargs("");
    // setUserinp("");
    setErrorLines([]);
  };
  useEffect(() => {
    setVersions(languageVersions[language]);
  }, [language])
  
  const versionHandler = (e) => {
    setVersion(e.target.value);
  };
  const execute = (e) => {
    e.preventDefault();
    setCompiling(true);
    if (language === "javascript") {
      setRunJs((value) => (value += 1));
      setCompiling(false);
      return;
    }
    setRunJs(0);
    const data = {
      code: code,
      language: language,
      version: version,
      userInput: userinp,
      cmdargs: cmdargs,
    };
    axios
      .post(
        "https://codeeditorbackend-production.up.railway.app/editor/execute",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setResult(response.data.output);
          console.log(response);
          setCompiling(false);
          parseErrors(response, setErrorLines, language);
        } else {
          setResult("error in response");
          setCompiling(false);
          throw new Error("Network response was not ok: ", response);
        }
      })
      .catch((error) => {
        console.error(error);
        setResult("error in request");
        setCompiling(false);
      });
  };
  const downloadFileLocally = () => {
    handleDownloadClick(code, languageExtensions[language]);
  };
  useEffect(() => {
    if (props.theme === "lighttheme") {
      let themeName = localStorage.getItem("editorThemeStoredLight");
      switch (themeName) {
        case "githubLight":
          setEditorTheme(githubLight);
          break;
        case "noctisLilac":
          setEditorTheme(noctisLilac);
          break;
        case "bbedit":
          setEditorTheme(bbedit);
          break;
        case "duotoneLight":
          setEditorTheme(duotoneLight);
          break;
        case "eclipse":
          setEditorTheme(eclipse);
          break;
        case "gruvboxLight":
          setEditorTheme(gruvboxLight);
          break;
        case "materialLight":
          setEditorTheme(materialLight);
          break;
        case "solarizedLight":
          setEditorTheme(solarizedLight);
          break;
        case "xcodeLight":
          setEditorTheme(xcodeLight);
          break;
        default:
          setEditorTheme(githubLight);
          break;
      }
    } else {
      let themeName = localStorage.getItem("editorThemeStoredDark");
      switch (themeName) {
        case "okaidia":
          setEditorTheme(okaidia);
          break;
        case "abcdef":
          setEditorTheme(abcdef);
          break;
        case "androidstudio":
          setEditorTheme(androidstudio);
          break;
        case "atomone":
          setEditorTheme(atomone);
          break;
        case "aura":
          setEditorTheme(aura);
          break;
        case "bespin":
          setEditorTheme(bespin);
          break;
        case "darcula":
          setEditorTheme(darcula);
          break;
        case "dracula":
          setEditorTheme(dracula);
          break;
        case "duotoneDark":
          setEditorTheme(duotoneDark);
          break;
        case "githubDark":
          setEditorTheme(githubDark);
          break;
        case "gruvboxDark":
          setEditorTheme(gruvboxDark);
          break;
        case "materialDark":
          setEditorTheme(materialDark);
          break;
        case "nord":
          setEditorTheme(nord);
          break;
        case "solarizedDark":
          setEditorTheme(solarizedDark);
          break;
        case "sublime":
          setEditorTheme(sublime);
          break;
        case "tokyoNight":
          setEditorTheme(tokyoNight);
          break;
        case "vscodeDark":
          setEditorTheme(vscodeDark);
          break;
        case "xcodeDark":
          setEditorTheme(xcodeDark);
          break;
        default:
          setEditorTheme(okaidia);
          break;
      }
    }
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      highlightErrors();
    }, 500);
  }, [props.theme]);
  useEffect(() => {
    highlightErrors();
  }, [errorLines]);
  useEffect(() => {
    let timeoutId;
    moveErrors(
      viewUpdateState,
      cmValuePrevious,
      errorLines,
      setErrorLines,
      setCmValuePrevious
    );
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      highlightErrors();
    }, 500);
  }, [viewUpdateState, errorLines]);
  const highlightErrors = () => {
    const linesEditor = document.getElementsByClassName("cm-line");
    if (linesEditor?.length >= errorLines?.length) {
      errorLines.forEach((lineNumber) => {
        if (props.theme === "lighttheme" && linesEditor[lineNumber - 1]) {
          linesEditor[lineNumber - 1].classList.add("error-line");
        } else if (linesEditor[lineNumber - 1]) {
          linesEditor[lineNumber - 1].classList.add("error-line-dark");
        }
      });
    }
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        let timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          highlightErrors();
        }, 500);
      }
    };
    document.addEventListener("click", highlightErrors);
    document.addEventListener("touchstart", highlightErrors);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("click", highlightErrors);
      document.removeEventListener("touchstart", highlightErrors);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });
  const [resultSm, setResultSm] = useState('')
  const resizeRef = useRef(null);




  //getting the file by id from url line
  const [projectInfo, setProjectInfo] = useState()
  const getProjectData = async () => {
    try {
      const projectData = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/projects/id?id=${projectId}`
      );
      if (projectData?.data) {
        console.log(projectData.data);
        toast.success("got project");
        getCollab();
        setCode(projectData.data?.codeFile);
        setLangauge(projectData.data.language)
        const temp = projectData.data;
        const updDate = calculateTimeDifference(temp.updatedAt);
        temp.updatedAt = updDate;
        const createdDate = new Date(temp.createdAt);
        const formattedDate = createdDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        temp.createdAt = formattedDate;
        setProjectInfo(temp);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }
  const { id: projectId } = useParams();
  const [newProject, setNewProject] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (projectId) {
     console.log(projectId);
      getProjectData(); 
    }
  }, [projectId]);
  useEffect(() => {
    if (projectInfo) {
      if (projectInfo?.author?._id === userInfo?._id) {
        setNewProject(false);
      }
    }
  }, [projectInfo])
  




  return (
    <ResizePannel
      id="pannelEditor"
      theme={props.theme}
      expanded={expanded}
      highlightErrors={highlightErrors}
      // onClick={startResizing}
    >
      <div className="elem elem1">
        <SideBar
          theme={props.theme}
          editorSize={props.editorSize}
          setExpanded={setExpanded}
          expanded={expanded}
          setEditorTheme={setEditorTheme}
          handleDownloadClick={downloadFileLocally}
          setCode={setCode}
          setLangauge={setLangauge}
          languageExtensions={languageExtensions}
          handleFileUpload={handleFileUpload}
          code={code}
          language={language}
          langVersion={version}
          cmd={cmdargs}
          params={userinp}
          projectId={projectId}
          newProject={newProject}
          setNewProject={setNewProject}
          collabId={collabId}
        >
          <div className="project-info-secion">
            <div>
              <div className="name">{projectInfo?.projectName}</div>
              <Link
                to={`/public/user/${projectInfo?.author?._id}#projects`}
                // state={{ userId: data?.author?._id }}
                // key={data?.author?._id}
                className="text-decoration-none black-link"
              >
                <div className="author">{projectInfo?.author?.name}</div>
              </Link>{" "}
            </div>
            <div>
              <div className="created text-muted">{projectInfo?.createdAt}</div>
              <div className="updated text-muted">{projectInfo?.updatedAt}</div>
            </div>
          </div>
        </SideBar>
      </div>
      <div className={`elem elem2 ${props.theme}`} id="CodeEditor">
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
          theme={editorTheme}
          height="546px"
          className="overflow-hidden"
          style={{ overflowX: "scroll", margin: "0.5rem 0 0.5rem 0" }}
          extensions={extensionsObj}
          onChange={onChangeCM}
        />
        <Button
          variant={props.theme == "lighttheme" ? "primary" : "dark"}
          className={`btn-editor-${props.editorSize}`}
          onClick={execute}
          style={{ marginBottom: "calc(1rem - 1px)" }}
        >
          Run
        </Button>
      </div>
      <div className={`elem ${props.theme} ${resultSm}`} ref={resizeRef}>
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
        <div className={`result ${props.theme}`}>
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
    </ResizePannel>
  );
};

export default Editor;

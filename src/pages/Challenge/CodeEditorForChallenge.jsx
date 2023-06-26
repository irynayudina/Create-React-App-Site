import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import CodeMirror from "@uiw/react-codemirror";
import {
    sampleCodes,
    languageVersions,
    languages,
    languageExtensions,
} from '../Editor/Syntax/EditorData.ts'
const CodeEditorForChallenge = (props) => {
    const languagesSelect = {
        "javascript": "JavaScript",
        'cpp17': "C++ 17",
        'java': "Java",
        'csharp': "C#",
    }
    const [code, setCode] = useState(sampleCodes.javascript);
    const [version, setVersion] = useState("0");
    const [versions, setVersions] = useState(languageVersions.javascript);
    const [language, setLangauge] = useState("javascript");
    const languageHandler = (e) => {
        const lang = e.target.value;
        setLangauge(lang);
        setVersions(languageVersions[lang]);
        setCode(sampleCodes[lang]);
    };
    const versionHandler = (e) => {
        setVersion(e.target.value);
    };
    return (
        <div className="challenge-editor">
            <div className="challenge-editor-top">
                <Form.Select
                    size="sm"
                    style={{ width: "auto", float: "left" }}
                    onChange={languageHandler}
                    value={language}
                    className={`select ${props.theme}`}
                >
                    {Object.keys(languagesSelect).map((key) => (
                        <option key={key} value={key}>
                            {languagesSelect[key]}
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
            </div>
            <CodeMirror
                value={code}
                mode={language}
                // theme={editorTheme}
                placeholder={"write your solution here"}
                height="546px"
                className="overflow-hidden"
                style={{ overflowX: "scroll", margin: "0.5rem 0 0.5rem 0" }}
            // extensions={extensionsObj}
            // onChange={onChangeCM}
            />
        </div>
    );
}

export default CodeEditorForChallenge
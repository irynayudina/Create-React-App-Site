import React, { useState, useEffect } from 'react'
import { Dropdown } from "react-bootstrap";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import {
  githubLight,
  githubDark,
} from "@uiw/codemirror-theme-github";
import {
  noctisLilac,
} from "@uiw/codemirror-theme-noctis-lilac";
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
import {
  materialDark,
  materialLight,
} from "@uiw/codemirror-theme-material";
import { nord, nordInit } from "@uiw/codemirror-theme-nord";
import {
  solarizedLight,
  solarizedDark,
} from "@uiw/codemirror-theme-solarized";
import { sublime} from "@uiw/codemirror-theme-sublime";
import { tokyoNight} from "@uiw/codemirror-theme-tokyo-night";
import { vscodeDark} from "@uiw/codemirror-theme-vscode";
import {
  xcodeLight,
  xcodeDark,
} from "@uiw/codemirror-theme-xcode";




const ThemesHandler = (props) => {
    const setThemesPick = props.setThemesPick;
    const changeEditorTheme = (t) => {
      props.setEditorTheme(t);
    };
    useEffect(() => {
      const handleHashChange = () => {
        const hashValue = window.location.hash.substring(1);
        let lightThemes = [
          "githubLight",
          "noctisLilac",
          "bbedit",
          "duotoneLight",
          "eclipse",
          "gruvboxLight",
          "materialLight",
          "solarizedLight",
          "xcodeLight",
        ];
        let darkThemes = [
          "okaidia",
          "abcdef",
          "androidstudio",
          "atomone",
          "aura",
          "bespin",
          "darcula",
          "dracula",
          "duotoneDark",
          "githubDark",
          "gruvboxDark",
          "materialDark",
          "nord",
          "solarizedDark",
          "sublime",
          "tokyoNight",
          "vscodeDark",
          "xcodeDark",
        ];
        if (lightThemes.includes(hashValue)) {
          localStorage.setItem("editorThemeStoredLight", hashValue);
        } else if (darkThemes.includes(hashValue)) {
          localStorage.setItem("editorThemeStoredDark", hashValue);
        }
      };
      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);

    useEffect(() => {
      if (props.theme == "lighttheme") {
        setThemesPick(
          <Dropdown.Menu>
            <Dropdown.Item
              href="#githubLight"
              onClick={() => changeEditorTheme(githubLight)}
            >
              <span>Github Light</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#noctisLilac"
              onClick={() => changeEditorTheme(noctisLilac)}
            >
              <span>Noctis Lilac</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#bbedit"
              onClick={() => {
                props.setEditorTheme(bbedit);
              }}
            >
              <span>Bbedit</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#duotoneLight"
              onClick={() => changeEditorTheme(duotoneLight)}
            >
              <span>Duotone Light</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#eclipse"
              onClick={() => changeEditorTheme(eclipse)}
            >
              <span>Eclipse</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#gruvboxLight"
              onClick={() => changeEditorTheme(gruvboxLight)}
            >
              <span>Gruvbox Light</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#materialLight"
              onClick={() => changeEditorTheme(materialLight)}
            >
              <span>Material Light</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#solarizedLight"
              onClick={() => changeEditorTheme(solarizedLight)}
            >
              <span>Solarized Light</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#xcodeLight"
              onClick={() => changeEditorTheme(xcodeLight)}
            >
              <span>Xcode Light</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        );
      } else {
        setThemesPick(
          <Dropdown.Menu>
            <Dropdown.Item
              href="#okaidia"
              onClick={() => changeEditorTheme(okaidia)}
            >
              <span>Okaida</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#abcdef"
              onClick={() => changeEditorTheme(abcdef)}
            >
              <span>Abcdef</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#androidstudio"
              onClick={() => changeEditorTheme(androidstudio)}
            >
              <span>Androidstudio</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#atomone"
              onClick={() => changeEditorTheme(atomone)}
            >
              <span>Atomone</span>
            </Dropdown.Item>
            <Dropdown.Item href="#aura" onClick={() => changeEditorTheme(aura)}>
              <span>Aura</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#bespin"
              onClick={() => changeEditorTheme(bespin)}
            >
              <span>Bespin</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#darcula"
              onClick={() => changeEditorTheme(darcula)}
            >
              <span>Darcula</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#dracula"
              onClick={() => changeEditorTheme(dracula)}
            >
              <span>Dracula</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#duotoneDark"
              onClick={() => changeEditorTheme(duotoneDark)}
            >
              <span>Duotone Dark</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#githubDark"
              onClick={() => changeEditorTheme(githubDark)}
            >
              <span>Github Dark</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#gruvboxDark"
              onClick={() => changeEditorTheme(gruvboxDark)}
            >
              <span>Gruvbox Dark</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#materialDark"
              onClick={() => changeEditorTheme(materialDark)}
            >
              <span>Material Dark</span>
            </Dropdown.Item>
            <Dropdown.Item href="#nord" onClick={() => changeEditorTheme(nord)}>
              <span>Nord</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#solarizedDark"
              onClick={() => changeEditorTheme(solarizedDark)}
            >
              <span>Solarized Dark</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#sublime"
              onClick={() => changeEditorTheme(sublime)}
            >
              <span>Sublime</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#tokyoNight"
              onClick={() => changeEditorTheme(tokyoNight)}
            >
              <span>Tokyo Night</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#vscodeDark"
              onClick={() => changeEditorTheme(vscodeDark)}
            >
              <span>Vscode Dark</span>
            </Dropdown.Item>
            <Dropdown.Item
              href="#xcodeDark"
              onClick={() => changeEditorTheme(xcodeDark)}
            >
              <span>Xcode Dark</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        );
      }
    }, [props.theme]);
  // return (
  //   <div>ThemesHandler</div>
  // )
}

export default ThemesHandler
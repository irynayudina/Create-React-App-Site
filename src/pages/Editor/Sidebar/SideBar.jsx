import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./SideBar.scss";
import {
  FaArrowLeft,
  FaFileCode,
  FaUsers,
  FaSdCard,
  FaFolderOpen,
  FaTrashAlt,
  FaEdit,
  FaLockOpen,
  FaDownload,
  FaWhmcs,
} from "react-icons/fa";

import SaveFile from "./SaveFile";
import ThemesHandler from "./ThemesHandler";
import { Link } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SideBar = (props) => {
  const [visibleDropdown, setVisibleDropdown] = useState("hiddenDropdown");
  const [visibleSidebar, setVisibleSidebar] = useState("");
  const [themesPick, setThemesPick] = useState("");
  const showSidebar = () => {
    setVisibleDropdown("hiddenDropdown");
    setVisibleSidebar("");
    props.setExpanded("expandedCustom-pannel");
  };
  const hideSidebar = () => {
    setVisibleDropdown("");
    setVisibleSidebar("hiddenSidebar");
    props.setExpanded("hiddenPannel");
  };
  const [filename, setFilename] = useState("project=/filename");
  const handleSaveClick = (e) => {
    e.stopPropagation();
  };

  const [fileSaveElement, setFileSaveElement] = useState("small");
  const [sidebarCode, setSidebarCode] = useState("");
  const [sidebarLanguage, setSidebarLanguage] = useState("");
  const [sidebarCmd, setSidebarCmd] = useState("");
  const [sidebarParam, setSidebarParam] = useState("");
  const [sidebarLangVersion, setSidebarLangVersion] = useState("");
  const [wasChanged, setChanged] = useState(false);
  
  useEffect(() => {
    //setting
    setSidebarCode(props.code);
    setSidebarLanguage(props.language);
    setSidebarCmd(props.cmd);
    setSidebarParam(props.param);
    setSidebarLangVersion(props.langVersion);
  }, [
    props,
    props.code,
    props.language,
    props.langVersion,
    props.cmd,
    props.params,
  ]);

  useEffect(() => {
    setFileSaveElement(
      <SaveFile
        newProject={props.newProject}
        code={sidebarCode}
        language={sidebarLanguage}
        langVersion={sidebarLangVersion}
        cmd={sidebarCmd}
        params={sidebarParam}
        setFilename={setFilename}
        setNewProject={props.setNewProject}
        projectId={props.projectId}
      />
    );
  }, [
    sidebarCode,
    sidebarLanguage,
    sidebarCmd,
    sidebarLangVersion,
    sidebarParam,
    filename,
    props.newProject,
  ]);

  const navigate = useNavigate();
  const deleteProjectHandler = async () => {
    try {
      const projectUpdated = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/delete",
        {
          projectId: props.projectId,
        },
        { withCredentials: true }
      );
      if (projectUpdated?.data) {
        console.log(projectUpdated.data);
        toast.success("project is deleted");
        setChanged(true);
        navigate("/editor");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
  const [renameStr, setRenameStr] = useState("");
  const renameProjectHandler = async () => {
    console.log("rrrr")
    try {
      const projectUpdated = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/id",
        {
          projectId: props.projectId,
          projectName: renameStr,
        },
        { withCredentials: true }
      );
      if (projectUpdated?.data) {
        console.log(projectUpdated.data);
        navigate(`/editor/${props.projectId}`);
        toast.success("renamed");
        window.location.reload();
      }
      console.log(projectUpdated);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };

  return (
    <div className={`side ${props.theme} ${props.editorSize}`}>
      <div>
        <ThemesHandler
          setExpanded={props.setExpanded}
          setEditorTheme={props.setEditorTheme}
          theme={props.theme}
          setThemesPick={setThemesPick}
        />
      </div>
      {/* {sidebarLayout} */}
      {props.editorSize == "sm" ? (
        <Dropdown className={`list-group list-group-flush`}>
          <Dropdown.Toggle
            variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
            id="dropdown-basic"
          >
            <p className="sidebar-dropdown-name">File menu</p>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item href="#1">
              <FaFileCode className="me-3" />
              <span>Editor ({filename})</span>
            </Dropdown.Item> */}
            {props.projectId ? props.children : ""}
            <Dropdown.Divider />
            <Dropdown.Item href="#11" onClick={handleSaveClick}>
              {fileSaveElement}
            </Dropdown.Item>
            <Dropdown.Item
              href="#3"
              onClick={() => props.handleDownloadClick()}
            >
              <FaDownload className="me-3" />
              <span>Save locally</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#7">
              <FaSdCard className="me-3" />
              <span>
                Open from drive{" "}
                <Form.Control
                  type="file"
                  className="open-drive-editor"
                  onChange={(event) => {
                    props.handleFileUpload(
                      event,
                      props.setCode,
                      props.setLangauge,
                      props.languageExtensions
                    );
                  }}
                />
              </span>
            </Dropdown.Item>
            <Dropdown.Item href="#8">
              <Link
                to={`/user#projects`}
                // state={{ userId: data?.author?._id }}
                // key={data?.author?._id}
                className="text-decoration-none black-link"
              >
                <FaFolderOpen className="me-3" />
                <span>Open from project</span>
              </Link>{" "}
            </Dropdown.Item>
            {props.projectId ? (<Dropdown.Item href="#10">
              <Link
                to={props.collabId}
                state={{ associatedProject_id: props.projectId }}
              >
                <FaUsers className="me-3" />
                <span>Collaboration mode</span>
              </Link>
            </Dropdown.Item>) : ""}
            {!props.newProject && !wasChanged ? (
              <>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="#null"
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  onMouseOver={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={renameProjectHandler}
                  >
                    <FaEdit className="me-3" />
                    <span>Rename</span>
                  </Button>
                  <Form.Control
                    type="text"
                    onChange={(e) => setRenameStr(e.target.value)}
                  />
                </Dropdown.Item>
                <Dropdown.Item href="#14" onClick={deleteProjectHandler}>
                  <FaTrashAlt className="me-3" />
                  <span>Delete</span>
                </Dropdown.Item>
              </>
            ) : (
              ""
            )}
            <Dropdown.Item>
              <Dropdown
                className={`list-group list-group-flush `}
                onClick={(e) => e.stopPropagation()}
              >
                <Dropdown.Toggle
                  className={`${
                    props.theme == "lighttheme"
                      ? "configure-view-editor-toggle-light-sm"
                      : "configure-view-editor-toggle-sm"
                  }`}
                >
                  <FaWhmcs className="me-3" />
                  <span>Configure view</span>
                </Dropdown.Toggle>
                {themesPick}
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <Dropdown
            className={`list-group list-group-flush ${visibleDropdown}`}
            onClick={showSidebar}
          >
            <Dropdown.Toggle
              variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
              id="dropdown-basic"
              className="dropdown-turned"
            >
              <p className="sidebar-dropdown-name">File menu</p>
            </Dropdown.Toggle>
          </Dropdown>{" "}
          <Button
            className={`hide-btn ${visibleSidebar}`}
            onClick={hideSidebar}
          >
            <FaArrowLeft className="me-3" />
            <span>Hide the Sidebar</span>
          </Button>
          <Nav className={`list-group list-group-flush ${visibleSidebar}`}>
            {props.projectId ? props.children : ""}
            <Nav.Link
              href="#11"
              className="list-group-item list-group-item-action py-2 ripple"
              onClick={handleSaveClick}
            >
              {fileSaveElement}
            </Nav.Link>
            <Nav.Link
              href="#3"
              className="list-group-item list-group-item-action py-2 ripple"
              onClick={() => props.handleDownloadClick()}
            >
              <FaDownload className="me-3" />
              <span>Save locally</span>
            </Nav.Link>
            <Nav.Link
              href="#7"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaSdCard className="me-3" />
              <span>
                Open from drive
                <Form.Control
                  type="file"
                  className={`${props.theme}-opndrv open-drive-editor-side`}
                  onChange={(event) => {
                    props.handleFileUpload(
                      event,
                      props.setCode,
                      props.setLangauge,
                      props.languageExtensions
                    );
                  }}
                />
              </span>
            </Nav.Link>
            <Nav.Link
              href="#8"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <Link
                to={`/user#projects`}
                // state={{ userId: data?.author?._id }}
                // key={data?.author?._id}
                className="text-decoration-none black-link"
              >
                <FaFolderOpen className="me-3" />
                <span>Open from project</span>
              </Link>{" "}
            </Nav.Link>
            {props.projectId ? (
              <Nav.Link
                href="#10"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <Link
                  to={props.collabId}
                  state={{ associatedProject_id: props.projectId }}
                >
                  <FaUsers className="me-3" />
                  <span>Collaboration mode</span>
                </Link>
              </Nav.Link>
            ) : (
              ""
            )}

            {!props.newProject && !wasChanged ? (
              <>
                <Nav.Link
                  className="list-group-item list-group-item-action py-2 ripple"
                  href="#null"
                  onKeyDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  onMouseOver={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={renameProjectHandler}
                  >
                    <FaEdit className="me-3" />
                    <span>Rename</span>
                  </Button>
                  <Form.Control
                    type="text"
                    onChange={(e) => setRenameStr(e.target.value)}
                    // autoComplete="off"
                  />
                </Nav.Link>
                <Nav.Link
                  href="#14"
                  className="list-group-item list-group-item-action py-2 ripple"
                  onClick={deleteProjectHandler}
                >
                  <FaTrashAlt className="me-3" />
                  <span>Delete</span>
                </Nav.Link>
              </>
            ) : (
              ""
            )}
            <Dropdown className={`list-group list-group-flush `} drop="end">
              <Dropdown.Toggle
                className={`${
                  props.theme == "lighttheme"
                    ? "configure-view-editor-toggle-light"
                    : "configure-view-editor-toggle"
                }`}
              >
                <FaWhmcs className="me-3" />
                <span>Configure view</span>
              </Dropdown.Toggle>
              {themesPick}
            </Dropdown>
          </Nav>
        </>
      )}
    </div>
  );
};

export default SideBar;

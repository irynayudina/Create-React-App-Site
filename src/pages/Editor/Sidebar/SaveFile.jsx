import React, { useState, useEffect } from "react";
import PopUp from "../../../elements/PopUp/PopUp";
import { FaCopy } from "react-icons/fa";
import Loader from "../../../elements/Loader";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const SaveFile = (props) => {
  // {
  //   code, language, langVersion, cmd, params, newProject;
  // }
  // useEffect(() => {
  //   console.log(props.code);
  // }, [props.code]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("project-name");
    console.log("name - " + name);
    console.log("code - " + props.code);
    console.log("language - " + props.language);
    try {
      setIsLoading(true);
      const project = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects",
        {
          projectName: name,
          codeFile: props.code,
          language: props.language,
        },
        { withCredentials: true }
      );
      if (project?.data) {
        console.log(project.data);
        props.setFilename(project.data.projectName);
        props.setNewProject(false);
        // Navigate to the editor page with the project ID
        navigate(`/editor/${project.data._id}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
    setIsLoading(false);
  };
  const handleEdit = async () => {
    console.log(props.projectId)
    try {
      setIsLoading(true);
      const project = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/id",
        {
          projectId: props.projectId,
          codeFile: props.code,
          language: props.language,
        },
        { withCredentials: true }
      );
      if (project?.data) {
        console.log(project.data);
        toast.success("edited");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
  const [content, setContent] = useState(
    <div>
      <FaCopy className="me-3" />
      <span>Save</span>
    </div>
  );
  useEffect(() => {
    if (props.newProject) {
      setContent(
        <PopUp>
          <div>
            <FaCopy className="me-3" />
            <span>Save</span>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="project-name"
                    label="Project Name"
                    name="project-name"
                    autoComplete="project-name"
                    autoFocus
                  />
                  {isLoading && <Loader />}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save new project
                  </Button>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </PopUp>
      );
    } else {
      setContent(
        <div onClick={handleEdit}>
          <FaCopy className="me-3" />
          <span>Save</span>
        </div>
      );
    }
  }, [props.newProject, props.code]);

  return <>{content}</>;
};

export default SaveFile;

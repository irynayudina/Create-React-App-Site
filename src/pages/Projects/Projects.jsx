import React, { useState, useEffect } from "react";
import "./Projects.scss";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { languages } from "../Editor/Syntax/EditorData.ts";
import { Button } from "react-bootstrap";
import Topic from "../Challenges/Topics/Topic";
import Project from "../Project/Project";
import axios from "axios";
import { toast } from "react-toastify";

import Loader from "../../elements/Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";

function useLoadItems(filerObj) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);

  let filterQuery = filerObj.projectName
    ? `&projectName=${filerObj.projectName}`
    : "";
  if (filerObj.language) {
    filterQuery += `&language=${filerObj.language}`;
  }

  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/projects?page=${page}${filterQuery}`,
          { withCredentials: true }
        );
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.projects.filter((item) => {
            // Check if the item's _id is not present in any of the previous items
            return !prevItems.some((prevItem) => prevItem._id === item._id);
          });
          // Concatenate the unique items with the previous items
          return [...prevItems, ...uniqueItems];
        });
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          setHasNextPage(nextPage <= response.data.totalPages);
          return nextPage;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    console.log(page + " inside loadmore");
  };

  const statesReset = () => {
    setPage(1);
    setHasNextPage(true);
    setLoading(false);
    setItems([]);
    setResetCompleted(true); //--
  };
  useEffect(() => {
    if (filterQuery !== "") {
      setResetCompleted(false);
      statesReset();
      console.log(page + " useEffect");
    }
  }, [filerObj, filterQuery]);

  useEffect(() => {
    if (resetCompleted) {
      loadMore();
    }
  }, [resetCompleted]);

  return { loading, items, hasNextPage, error, loadMore };
}

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "999k",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
  ]);
  const [sortProjects, setSortProjects] = useState("0");

  const [filerObj, setFilterObj] = useState({});

  let { loading, items, hasNextPage, error, loadMore } = useLoadItems(filerObj);
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    setProjects(items);
  }, [items]);

  const [name, setName] = useState("");
  const [languagesSelected, setLanguagesSelected] = useState([]);
  const handleLanguageChange = (event, language) => {
    if (event.target.checked) {
      // Add the selected language to the array
      setLanguagesSelected([...languagesSelected, language]);
    } else {
      // Remove the unselected language from the array
      setLanguagesSelected(
        languagesSelected.filter((lang) => lang !== language)
      );
    }
  };
  const filterProjects = () => {
    setFilterObj({
      projectName: name,
      language: languagesSelected,
    });
    console.log({
      projectName: name,
      language: languagesSelected,
    });
    // console.log(sortDiscussions);
  };

  useEffect(() => {
    filterProjects();
  }, []);

  return (
    <div className="projects-container">
      <h5 className="title-projects">Open projects of community</h5>
      <div className="topsection-projects">
        <Form.Select
          value={sortProjects}
          onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="1">Recent</option>
          <option value="2">Popular</option>
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={(e) => setName(e.target.value)}
        />
        <Button size="md" onClick={filterProjects}>
          Search
        </Button>
      </div>
      <Topic title="Select languages" className="languages-select">
        <div className="languages">
          {Object.keys(languages).map((keyLanguage) => (
            <Form.Check
              key={keyLanguage}
              type="checkbox"
              label={languages[keyLanguage]}
              value={keyLanguage}
              onChange={(e) => handleLanguageChange(e, keyLanguage)}
            />
          ))}
        </div>
      </Topic>
      <div className="projects-display-open">
        {projects.map((project, i) => (
          <Project project={project} key={i} index={i} />
        ))}
      </div>
      {(loading || hasNextPage) && (
        <ListGroup className="loader-container-list-item">
          <ListGroup.Item ref={sentryRef}>
            <Loader />
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
};

export default Projects;

import React, {useEffect, useState} from 'react'
import './UserProjects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import Project from './Project';
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//collaboration interface - save in a connected project, leave, display list of people who edit now, display list of people who have access
//creating collaboration from project: name = project name, connected project = projecct id,
//creating from navbar:  name and connected project are unset, required to select before saving in project - a list of user projects to click on and pick from, to get the project name and id
//shema for collaboration - id, text, name, connected project id, collaborators ids, currently editing collaborators ids
//endpoints for:  saving in project, leaving, displaying currently connected users, displaying all users, updating text, assigning project - name and id, assigning adding and removing a user 
import Loader from '../../../elements/Loader';
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import LoadCollabs from './LoadCollabs';

function useLoadItems(userId, wasChanged) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);
  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/projects?page=${page}&authorId=${userId}`
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
  setResetCompleted(false);
  statesReset();
  console.log(page + " useEffect");
}, [wasChanged]);

  useEffect(() => {
    if (resetCompleted) {
      loadMore();
    }
  }, [resetCompleted]);

  useEffect(() => {
    console.log(wasChanged);
  }, [wasChanged]);
  

  return { loading, items, hasNextPage, error, loadMore };
}

const UserProjects = (props) => {
  const [wasChanged, setChanged] = useState(false)
  const { userInfo } = useSelector((state) => state.auth);
  const { id: viewedUserId } = useParams();
  const userId = viewedUserId || userInfo._id
  const [fromPublicPage, setFromPublicPage] = useState(viewedUserId);
  const [projects, setProjects] = useState([]);
  const deleteProjectHandler = async (i, project_id) => {
    try {
      const projectUpdated = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/delete",
        {
          projectId: project_id,
        }
      );
      if (projectUpdated?.data) {
        console.log(projectUpdated.data);
        toast.success("project is deleted");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };

  let { loading, items, hasNextPage, error, loadMore } = useLoadItems(userId, wasChanged);
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

  const [projectsChecked, setProjectsChecked] = useState(true);
  const [collaborationsChecked, setCollaborationsChecked] = useState(false);

  const handleProjectsChange = () => {
    setProjectsChecked(true);
    setCollaborationsChecked(false);
  };

  const handleCollaborationsChange = () => {
    setProjectsChecked(false);
    setCollaborationsChecked(true);
  };

  return (
    <div className="projects-container">
      <h5 className="title-projects">Created projects & Collaborations</h5>
      <div className="topsection-projects">
        <Form.Select>
          <option value="1">Recent</option>
        </Form.Select>
        <div>
          <Form.Check
            type="switch"
            label="Projects"
            checked={projectsChecked}
            onChange={handleProjectsChange}
          />
          <Form.Check
            type="switch"
            label="Collaborations"
            checked={collaborationsChecked}
            onChange={handleCollaborationsChange}
          />
        </div>
      </div>
      {projectsChecked ? (
        <div className="projects-display">
          {projects.map((project, i) => (
            <Project
              project={project}
              index={i}
              key={i}
              deleteProjectHandler={deleteProjectHandler}
              fromPublicPage={fromPublicPage}
              setChanged={setChanged}
            />
          ))}
        </div>
      ) : (
        <LoadCollabs wasChanged={wasChanged} userId={userId} />
      )}
      {(loading || hasNextPage) && (
        <ListGroup className="loader-container-list-item">
          <ListGroup.Item ref={sentryRef}>
            <Loader />
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}

export default UserProjects


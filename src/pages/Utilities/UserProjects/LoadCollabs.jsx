import React, { useEffect, useState } from "react";
import "./UserProjects.scss";
import axios from "axios";
import Loader from "../../../elements/Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
import { Button } from "react-bootstrap";



function useLoadCollabs(userId, wasChanged) {
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
          `https://codeeditorbackend-production.up.railway.app/api/collab?page=${page}&owner_id=${userId}`
        );
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.collabs.filter((item) => {
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

const LoadCollabs = (props) => {
    const [collabs, setCollabs] = useState([]);
    let { loading, items, hasNextPage, error, loadMore } = useLoadCollabs(
      props.userId,
      props.wasChanged
    );
    const [sentryRef] = useInfiniteScroll({
      loading,
      hasNextPage,
      onLoadMore: loadMore,
      disabled: !!error,
      rootMargin: "0px 0px 400px 0px",
    });
    useEffect(() => {
      setCollabs(items);
    }, [items]);
  return (
    <div>
      <div className="projects-display">
        {collabs.map((collab, i) => (
          <div className="collab-card">
            <Link to={`/documents/${collab?.collab_id}`}>
              <Button variant="outline-primary" size="sm">
                <BsPencilSquare /> Open Collab
              </Button>
            </Link>
            <p className="name-collab">{collab?.collab_id}</p>
            <p className="name-project-collab">
              <span className="text-muted">Related project: </span>
              <Link
                to={`/editor/${collab?.associatedProject?._id}`}
                className="text-decoration-none black-link"
              >
                {collab?.associatedProject?.projectName}
              </Link>
            </p>
          </div>
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
}

export default LoadCollabs

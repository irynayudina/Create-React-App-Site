import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import "./List.scss";
import DiscussionDisplay from "../../pages/Discussions/DiscussionDisplay";
import { BsFillChatLeftFill, BsHandThumbsUpFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function useLoadItems(filerObj) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);

  let filterQuery = filerObj?.authorId ? `&authorId=${filerObj?.authorId}` : "";
    console.log(filterQuery);
  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/discussions/all?page=${page}${filterQuery}`
        );
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.discussions.filter((item) => {
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

export default function InfiniteLoaderForUserDiscussions({ filerObj }) {
  // call your hook here
  let { loading, items, hasNextPage, error, loadMore } = useLoadItems(filerObj);

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <ListGroup>
      {items.map((item) => (
        <Link
          to={`/discussion/${item?._id}`}
          key={item?._id}
          className="text-decoration-none black-link"
        >
          <div className="discussion-item">
            <div className="topsection">
              <div className="discussion-title">{item.title}</div>
              <div className="discussion-date text-muted">
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </div>
            </div>
            <div className="discussion-text">{item.text}</div>
            <div className="numbers text-muted">
              <div className="discussion-likes">
                {/* <BsHandThumbsUpFill />
                {item.likes} */}
              </div>
              <div className="discussion-comments">
                <BsFillChatLeftFill />
                {item.comments.length}
              </div>
            </div>
          </div>
        </Link>
      ))}
      {(loading || hasNextPage) && (
        <ListGroup.Item ref={sentryRef}>
          <Loader />
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

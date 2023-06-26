import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import "./List.scss";
import DiscussionDisplay from "../../pages/Discussions/DiscussionDisplay";
function useLoadItems(filerObj) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);

  let filterQuery = filerObj.topic ? `&topic=${filerObj.topic}` : "";
  if (filerObj.title) {
    filterQuery += `&title=${filerObj.title}`;
  }
  if (filerObj.tags) {
    filterQuery += `&tags=${filerObj.tags}`;
  }
  if (filerObj.sortBy) {
    filterQuery += `&sortBy=${filerObj.sortBy}`;
  }
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
    setResetCompleted(true);//--
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

export default function InfiniteListWithVerticalScroll({ filerObj }) {
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
        <DiscussionDisplay key={item._id} discussion={item} />
      ))}
      {(loading || hasNextPage) && (
        <ListGroup.Item ref={sentryRef}>
          <Loader />
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

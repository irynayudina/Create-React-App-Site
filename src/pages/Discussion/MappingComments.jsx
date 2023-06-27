import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../../elements/Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import DiscussionSection from "./DiscussionSection";

function useLoadItems(filerObj) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);

  const loadMore = async () => {
    if (!loading && hasNextPage && filerObj?._id) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/comments/ofDiscussion?discussionId=${filerObj?._id}&page=${page}`,
          { withCredentials: true }
        );
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.comments.filter((item) => {
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
    if (filerObj) {
      setResetCompleted(false);
      statesReset();
      console.log(page + " useEffect");
    }
  }, [filerObj]);

  useEffect(() => {
    if (resetCompleted) {
      loadMore();
    }
  }, [resetCompleted]);

  return { loading, items, hasNextPage, error, loadMore };
}

const MappingComments = ({ data }) => {
  let { loading, items, hasNextPage, error, loadMore } = useLoadItems(data);
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <div>
      <ListGroup>
        {items.map((item) => (
          <DiscussionSection commentData={item} key={item._id} />
        ))}
        {(loading || hasNextPage) && (
          <ListGroup.Item ref={sentryRef}>
            <Loader />
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default MappingComments;

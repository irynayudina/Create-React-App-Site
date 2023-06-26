import React, { useState, useEffect } from "react";
import "./Discussion.scss";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftFill,
} from "react-icons/bs";
import ReplyDiscussion from "./ReplyDiscussion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MappingComments from "./MappingComments";
import { useParams } from "react-router-dom";

const Discussion = () => {
  const { id: discussionId } = useParams();
  const [data, setData] = useState();
  // const location = useLocation();
  // const { state } = location;

  const handleDiscussionLoad = async (discussionId) => {
    try {
      const discussion = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/discussions?discussionId=${discussionId}`,
        {
          discussionId: discussionId,
        }
      );
      if (discussion?.data) {
        const date = new Date(discussion.data.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        discussion.data.createdAt = formattedDate;
        setData(discussion.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };

  useEffect(() => {
   
      handleDiscussionLoad(discussionId);
  }, [discussionId]);

  const handleReply = (commentNew) => {
    if (commentNew) {
      setData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.comments = [commentNew._id, ...prevData.comments];
        return updatedData;
      });
      setExpandedComments(true);
    }
  };
  
  const [expandedComments, setExpandedComments] = useState(true);
  const [showReplyFormDiscussion, setShowReplyFormDiscussion] = useState(false);
  return (
    <div className="discussion-page">
      <div className="discussion-header">
        <h4 className="d-flex justify-content-between align-items-center flex-wrap">
          <div>{data?.title} </div>
          <small>
            <Badge bg="secondary" className="float-right mt-2">
              {data?.topic} {" discussion"}
            </Badge>
          </small>
        </h4>
        {data?.tags?.map((tag, index) => (
          <Badge variant="success" key={index}>
            {tag}
          </Badge>
        ))}
      </div>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            <Link
              to={`/public/user/${data?.author?._id}`}
              // state={{ userId: data?.author?._id }}
              key={data?.author?._id}
              className="text-decoration-none black-link"
            >
              {data?.author?.name}
            </Link>{" "}
            • {data?.createdAt}
          </Card.Subtitle>
          <Card.Text>{data?.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="gap-3">
          <Card.Subtitle className="discussion-footer">
            {/* <div className="d-flex align-items-center">
              {" "}
              <BsFillHandThumbsUpFill /> {data?.likes}
            </div> */}
            <div
              onClick={() => setExpandedComments(!expandedComments)}
              className="show-comments"
            >
              <BsFillChatLeftFill /> {data?.comments?.length}
            </div>
            <div
              className="reply-button"
              onClick={() => setShowReplyFormDiscussion((value) => !value)}
            >
              reply
            </div>
          </Card.Subtitle>
          <Card.Subtitle className="d-flex align-items-center"></Card.Subtitle>
        </Card.Footer>
      </Card>
      {showReplyFormDiscussion ? (
        <ReplyDiscussion discussionId={data?._id} handleReply={handleReply} />
      ) : (
        ""
      )}
      <div className="comment-section">
        {expandedComments ? <MappingComments data={data} /> : ""}
      </div>
    </div>
  );
};

export default Discussion;

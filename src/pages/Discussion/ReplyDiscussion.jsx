import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../elements/Loader";

const ReplyDiscussion = ({ discussionId, handleReply }) => {
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const comment = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/comments",
        {
          text: commentText,
          parentDiscussion: discussionId,
        },
        { withCredentials: true }
      );
      if (comment?.data) {
        // setCommentNew(comment.data);
        const commentTo = await axios.post(
          "https://codeeditorbackend-production.up.railway.app/api/discussions/comments",
          {
            discussionId,
            commentId: comment.data?._id,
          },
          { withCredentials: true }
        );
        handleReply(comment.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    } finally {
      setIsLoading(false);
    }
    setCommentText("");
  };
  return (
    <div className="reply-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader />}
        <Button variant="primary" type="submit" disabled={isLoading} size="md">
          Reply
        </Button>
      </Form>
    </div>
  );
};

export default ReplyDiscussion;

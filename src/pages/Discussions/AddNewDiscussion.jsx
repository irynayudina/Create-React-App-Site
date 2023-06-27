import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../elements/Loader";

const CreateDiscussionForm = () => {
  const navigate = useNavigate();
  const [discussionData, setDiscussionData] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [topic, setTopic] = useState("Custom");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!tags.includes(topic)) {
      tags.shift();
      setTags([topic, ...tags]);
    }
  }, [topic])
  const topicOptions = [
    { value: "Algorithms", label: "Algorithms" },
    { value: "Web", label: "Web" },
    { value: "Custom", label: "Custom" },
  ];

  useEffect(() => {
    if (discussionData) {
      navigate(`/discussion/${discussionData._id}`, { state: discussionData });
    }
  }, [navigate, discussionData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const discussion = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/discussions",
        {
          topic: topic,
          title: title,
          text: text,
          tags: tags,
        },
        { withCredentials: true }
      );
      if (discussion?.data) {
        setDiscussionData(discussion.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    let v = e.target.value;
    if (e.key === "Enter") {
      let v = e.target.value.trim(); 
      if (v && !tags.includes(v)) {
        setTags([...tags, v]);
      }
      e.target.value = ""; 
    }
  };

  return (
    <div>
      <h5>Create a new discussion</h5>
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit} className="form-discussion-create">
        <Form.Group controlId="formTopic">
          <Form.Label>Select Topic *</Form.Label>
          <Form.Control
            as="select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Title*</Form.Label>
          <Form.Control
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Text *</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Col className="horizontal-tags">
            {tags.map((t, i) => (
              <Form.Check type="checkbox" label={t} key={i} />
            ))}
          </Col>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            onKeyDown={handleKeyDown}
          />
        </Form.Group>

        <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
          Create Discussion
        </Button>
      </Form>
    </div>
  );
};

export default CreateDiscussionForm;

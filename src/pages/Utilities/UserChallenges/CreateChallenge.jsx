import React, {useState} from 'react'
import { Form, Button, Col } from "react-bootstrap";

const CreateChallenge = () => {
  // State for form input values
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("")
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  // Options for topic select input
  const topicOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Function to handle tag input change
  const handleTagInputChange = (e) => {
    // Load dynamic tags here based on user input
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data here
    };
    const [testcase, setTestCase] = useState("");
    const [testValue, setTestValue] = useState("");
    const [testcases, setTestCases] = useState([]);

    const handleAddTestCase = () => {
        if (testcase.trim() !== "") {
            let t = {
                isChecked: true, text: testcase.trim(), value: testValue
            };
        setTestCases([...testcases, t]);
        setTestCase("");
      }
    };
    const handleCheckChange = (index) => {
      const newCheckboxes = [...testcases];
      newCheckboxes[index].isChecked = !newCheckboxes[index].isChecked;
      setTestCases(newCheckboxes);
    };
    const [tagsChallenge, setTagsChallenge] = useState([])
    const handleKeyDown = (e) => {
        let v = e.target.value;
        if (e.key === "Enter") {
            setTagsChallenge([...tagsChallenge, v]);
        }

    }
  return (
    <div className="create-cchallenge-form">
      <h5>Create a new challenge</h5>
      <Form onSubmit={handleSubmit} className="form-challenge-create">
        <Form.Group controlId="formTopic">
          <Form.Label>Select Topic</Form.Label>
          <Form.Control
            as="select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select Topic</option>
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formDifficulty">
          <Form.Label>Select Difficulty Level</Form.Label>
          <Form.Control
            as="select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="formTestCases"
          className="test-cases-forming"
        >
          <Form.Label>Test cases</Form.Label>
          <Form.Control
            className="test-description"
            placeholder="description"
            as="textarea"
            rows={1}
            value={testcase}
            onChange={(e) => setTestCase(e.target.value)}
          />
          <Form.Control
            className="test-value"
            placeholder="expected result"
            as="textarea"
            rows={1}
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
          />
          <Button onClick={handleAddTestCase}>+</Button>
        </Form.Group>

        {testcases.map((tc, index) => (
          <Form.Group controlId={`formTestCases_${index}`} key={index}>
            <Form.Check
              type="checkbox"
              label={tc.text}
              checked={tc.isChecked}
              onChange={() => handleCheckChange(index)}
            />
          </Form.Group>
        ))}

        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Col className="horizontal-tags">
            {tagsChallenge.map((t, i) => (
                <Form.Check type="checkbox" label={t} key={i} />
            ))}
            <Form.Check type="checkbox" label="Tag 2" />
            <Form.Check type="checkbox" label="Tag 3" />
          </Col>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            onChange={handleTagInputChange}
            onKeyDown={handleKeyDown}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-2'>
          Create Challenge
        </Button>
      </Form>
    </div>
  );
}

export default CreateChallenge
import React from 'react'
import Topic from './Topic';
import { Container, Row, Col, Form } from "react-bootstrap";
import { languages } from '../../Editor/Syntax/EditorData.ts';

const Topics = ({topicsSelected, setTopicsSelected }) => {
  const handleTopicsChange = (topic) => {
    if (topicsSelected.includes(topic)) {
      setTopicsSelected(topicsSelected.filter((t) => t !== topic));
    } else {
      setTopicsSelected([...topicsSelected, topic]);
    }
  };
  return (
    <div className="challenges-topics">
      <p>Challenge Topics</p>
      <Topic title="Algorithms and Data Structures">
        <Form.Check
          type="checkbox"
          label={"All"}
          value="All"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Sorting Algorithms"}
          value="Sorting Algorithms"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Search Algorithms"}
          value="Search Algorithms"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Graph Algorithms"}
          value="Graph Algorithms"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Dynamic Programming"}
          value="Dynamic Programming"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Data Structures"}
          value="Data Structures"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Computational Geometry"}
          value="Computational Geometry"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"String Algorithms"}
          value="String Algorithms"
          onChange={handleTopicsChange}
        />
      </Topic>
      <Topic title="Web Development">
        <Form.Check
          type="checkbox"
          label={"All"}
          value="All"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"JavaScript"}
          value="JavaScript"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Node.js"}
          value="Node.js"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Python"}
          value="Python"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"Ruby"}
          value="Ruby"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"PHP"}
          value="PHP"
          onChange={handleTopicsChange}
        />
        <Form.Check
          type="checkbox"
          label={"SQL"}
          value="SQL"
          onChange={handleTopicsChange}
        />
      </Topic>
      <Topic title="Custom User Challenges">
        <Form.Check
          type="checkbox"
          label={"All"}
          value="All"
          onChange={handleTopicsChange}
        />
        {Object.keys(languages).map((key) => (
          <Form.Check
            key={key}
            type="checkbox"
            label={languages[key]}
            value={languages[key]}
            onChange={handleTopicsChange}
          />
        ))}
      </Topic>
    </div>
  );
};

export default Topics
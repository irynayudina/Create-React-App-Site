import React, { useState } from "react";
import { Form } from "react-bootstrap";

import "./TopUsers.scss";
const TopUsers = () => {
  const users = [
    {
      name: "user",
      topic1Rating: "20",
      topic2Rating: "30",
      topic3Rating: "0",
    },
    {
      name: "user2",
      topic1Rating: "25",
      topic2Rating: "30",
      topic3Rating: "10",
    },
  ];
  const [selectedTopic, setSelectedTopic] = useState("topic1Rating");
  const [usersShow, setUsersShow] = useState(users);

  const handleTopicSelect = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    const sortedUsers = users.slice().sort((a, b) => b[topic] - a[topic]);
    setUsersShow(sortedUsers);
  };

  return (
    <div className="top-users">
      <div className="topic-select-users">
        <Form.Check
          type="radio"
          label={"web"}
          value="topic1Rating"
          onChange={handleTopicSelect}
          checked={selectedTopic === "topic1Rating"}
        />
        <Form.Check
          type="radio"
          label={"algorithms"}
          value="topic2Rating"
          onChange={handleTopicSelect}
          checked={selectedTopic === "topic2Rating"}
        />
        <Form.Check
          type="radio"
          label={"custom"}
          value="topic3Rating"
          onChange={handleTopicSelect}
          checked={selectedTopic === "topic3Rating"}
        />
      </div>
      <div>
        Users
        <ul>
          {usersShow.map((user) => (
            <li key={user.name}>
              {user.name} - {selectedTopic && user[selectedTopic]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopUsers;

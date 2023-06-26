import React, { useState } from 'react'
import { Form, Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import './ChallengeList.scss'
const ChallengesList = () => {
  const allChallenges = [
    {
      name: "challenge 1",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
    },
    {
      name: "challenge 2",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
    },
  ];
  const [challengesShow, setChallengesShow] = useState(allChallenges);
  const [sortChallenges, setSortchallenges] = useState('0')
  return (
    <div className="challenges-list">
      <div className="challenge-list-top-section">
        {/* <div className="challenge-title">Challenges List</div> */}
        <div className="sort-challenges">
          <Form.Select
            value={sortChallenges}
            onChange={(e) => setSortchallenges(e.target.value)}
          >
            <option value="0">Trending</option>
            <option value="1">Recent</option>
            <option value="2">Popular</option>
          </Form.Select>
        </div>
        <div className="search-challenge">
          <Form.Control
            type="text"
            placeholder="Search"
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            // variant={`${props.theme === "darktheme" ? "secondary" : "primary"}`}
            size="md"
            // onClick={filterDiscussions}
          >
            Search
          </Button>
        </div>
        {/* <div className="filters-challenge">
          
        </div> */}
      </div>
      {challengesShow.map((c, index) => (
        <Link to="/challenge" key={index} className="text-decoration-none">
          <div className="challenge-item">
            <div className="challenge-topsection">
              <div>
                <p className="fw-bold">{c.name}</p>
                <p className="topic-name text-secondary">{c.topic}</p>
              </div>
              <div className="metadata-challenge text-secondary">
                <p>{c.difficulty}</p>
                <p>{c.createdAt}</p>
                <p className="text-wrap">{c.author}</p>
              </div>
            </div>
            {/* <p>{c.text}</p> */}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChallengesList
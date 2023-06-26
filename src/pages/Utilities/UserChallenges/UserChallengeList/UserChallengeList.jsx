import React from "react";
import { Form, Badge } from "react-bootstrap";
import {
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsFillDashCircleFill,
  BsAlarm,
} from "react-icons/bs";
import { GiTyre, GiTwoCoins } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import "./UserChallengeList.scss";
const UserChallengeList = ({ challenges }) => {

  return (
    <div className="challenges-user-list">
      {challenges.map((challenge, index) => (
        <div key={index} className={`challenge-user-item `}>
          <div className="left">
            <div className="left-top">
              <div
                className={`status-challenge status-${challenge.status.toLowerCase()}`}
              >
                {challenge.status == "passed" ? (
                  <BsFillCheckCircleFill />
                ) : challenge.status == "attempted" ? (
                  <BsFillCircleFill />
                ) : (
                  <BsFillDashCircleFill />
                )}
              </div>
              <div className="challenge-name">{challenge.name}</div>
            </div>
            <div className="left-bottom text-muted">
              <div className="cases-passed">
                {challenge.casesPassed} cases of {challenge.casesAll}
              </div>
              <div className="points-earned">
                {challenge.pointsEarned}
                <GiTwoCoins /> poins earned
              </div>
              <div className="time-taken">
                {challenge.timeTaken}
                <BsAlarm />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="top-right text-muted">
              <div>
                {challenge.difficulty === "easy" && (
                  <>
                    <FaStar />
                  </>
                )}
                {challenge.difficulty === "medium" && (
                  <>
                    <FaStar />
                    <FaStar />
                  </>
                )}
                {challenge.difficulty === "hard" && (
                  <>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </>
                )}
              </div>
              <Badge bg="secondary">{challenge.topic}</Badge>
            </div>
            <div className="date-challenge text-muted">
              {challenge.createdAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChallengeList;

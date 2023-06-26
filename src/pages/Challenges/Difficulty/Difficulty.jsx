import React from 'react'
import { FaStar } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";
import './Difficulty.scss'
const Difficulty = ({ difficultyLevelsSelected, setDifficultyLevelsSelected}) => {
  const handleDifficultyLevelChange = (level) => {
    if (difficultyLevelsSelected.includes(level)) {
      setDifficultyLevelsSelected(
        difficultyLevelsSelected.filter((l) => l !== level)
      );
    } else {
      setDifficultyLevelsSelected([...difficultyLevelsSelected, level]);
    }
  };
  const renderDifficultyLevel = (level) => {
    const isSelected = difficultyLevelsSelected.includes(level);
    return (
      <Form.Check
        type="checkbox"
        id={`difficulty-${level}`}
        key={level}
        label={
          <>
            {level === "easy" && <FaStar />}
            {level === "medium" && (
              <>
                <FaStar />
                <FaStar />
              </>
            )}
            {level === "hard" && (
              <>
                <FaStar />
                <FaStar />
                <FaStar />
              </>
            )}
            <span className="label">{" " + level}</span>
          </>
        }
        checked={isSelected}
        onChange={() => handleDifficultyLevelChange(level)}
      />
    );
  };
  return (
    <div className="challenges-difficulty">
      <p className="difficulty-title">Difficulty Level</p>
      <div className="difficulty-levels">
        {renderDifficultyLevel("easy")}
        {renderDifficultyLevel("medium")}
        {renderDifficultyLevel("hard")}
      </div>
    </div>
  );
};

export default Difficulty
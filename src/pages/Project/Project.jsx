import React, { useEffect, useState } from 'react'
import { Form, Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";

import { calculateTimeDifference } from "../../elements/UpdateTimeCalculate";

const Project = ({ project, index }) => {
  const [updAt, setUpdAt] = useState("")
  useEffect(() => {
    const updDate = calculateTimeDifference(project.updatedAt);
    setUpdAt(updDate);
  }, [project]);
  
  return (
    <div className="project-item" key={index}>
      <div className="open-file-button">
        <Link to={`/editor/${project._id}`}>
          <Button variant="outline-primary" size="sm">
            <BsCodeSlash /> Edit code
          </Button>
        </Link>
      </div>
      <h6 className="project-name">{project.projectName}</h6>
      <div className="project-language">
        <Badge bg="secondary">{project.language}</Badge>
      </div>
      <div className="numbers">
        <div className="likes">
          {/* <BsFillHandThumbsUpFill /> {project.likes} */}
        </div>
        <div className="text-muted">
          <BsClock /> {updAt}
        </div>
      </div>
    </div>
  );
}

export default Project
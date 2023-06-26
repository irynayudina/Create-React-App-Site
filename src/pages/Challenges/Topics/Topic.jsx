import React, { useState } from 'react'
import './Topics.scss'
import { BsFillCaretDownFill } from "react-icons/bs";
const Topic = ({title, className, children}) => {
    const [topicExpand, setTopicExpand] = useState(false);
  return (
      <div className={className}>
      <p className="topic-title" onClick={(event) => setTopicExpand((prev) => !prev)}>
        {title} <BsFillCaretDownFill className="icon-topic" />
      </p>
      {topicExpand && children}
    </div>
  );
}

export default Topic
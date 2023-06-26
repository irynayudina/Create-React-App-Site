import React, {useState} from 'react'
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
  BsFillChatLeftFill,
} from "react-icons/bs";
const Comment = ({c, i}) => {
    const [showReply, setShowReply] = useState(false)
  return (
    <div key={i} className="challenge-comment-container mb-3">
      <div className="top d-flex justify-content-between mb-1">
        <div>{c.author}</div>
        <div>{c.date}</div>
      </div>
      <div className="mb-1">{c.text}</div>
      <div className="bottom d-flex gap-3">
            <div onClick={() => setShowReply(!showReply)} className='show-reply'>
                <BsFillChatLeftFill />{" "}
                {c.answers.length}
        </div>
        <div className="d-flex align-items-center">
          <BsFillHandThumbsUpFill />
          {c?.likes}
        </div>
      </div>
      <div>
        {showReply
          ? c.answers.map((reply, j) => (
              <div key={j} className="challenge-reply-container mb-3">
                <div className="top d-flex justify-content-between mb-1">
                  <div>{reply.author}</div>
                  <div>{reply.date}</div>
                </div>
                <div className="mb-1">{reply.text}</div>
                <div className="d-flex align-items-center">
                  <BsFillHandThumbsUpFill />
                  {reply?.likes}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Comment
import React, { useState, useRef, useEffect } from "react";
import './ResizePannelCollab.scss'
const ResizePannelCollab = ({children}) => {
    const childrenArray = React.Children.toArray(children);
    const leftElem = childrenArray[0];
    const rightElem = childrenArray[1];
  const theme = "lighttheme";
  const [leftWidth, setLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const startResizing = () => {
    setIsResizing(true);
  };
  const stopResizing = () => {
    setIsResizing(false);
  };
  const handleResize = (e) => {
    if (!isResizing) return;
    const resizeWidth = resizeRef.current.offsetWidth;
    const containerWidth = resizeRef.current.parentNode.offsetWidth;
    const leftItemWidth = e.pageX - resizeRef.current.parentNode.offsetLeft;
    const rightItemWidth = containerWidth - leftWidth - resizeWidth;
    setLeftWidth((leftItemWidth / containerWidth) * 100);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResizing);
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResizing);
    };
  });
  return (
    <div className="pannel-resize collab">
      <div className={`two-main-items ${theme}`} style={{ width: `${100}%` }}>
        <div
          className={`item left-item ${theme}`}
          style={{ width: `${leftWidth}%` }}
        >
          {leftElem}
        </div>
        <div
          className={`resize-controll ${theme}`}
          onMouseDown={startResizing}
          ref={resizeRef}
        ></div>
        <div
          className={`item right-item ${theme}`}
          style={{ width: `${100 - leftWidth}%` }}
        >
          {rightElem}
        </div>
      </div>
    </div>
  );
};

export default ResizePannelCollab;

import React, { useState, useEffect } from "react";
import { Resizable, ResizableBox, ResizeObserver } from "react-resizable";
import "react-resizable/css/styles.css";
// import "./Challenge.scss";

const ResizingWrapper = ({children, s1, s2, s3}) => {
  const childrenArray = React.Children.toArray(children);
  const section1 = childrenArray[0] || s1;
  const section2 = childrenArray[1] || s2;
  const section3 = childrenArray[2] || s3;
  function convertVhToPx(valueInVh) {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const valueInPx = (valueInVh / 100) * vh;
    return valueInPx;
  }
  function vwToPx(valueInVw) {
    const pixelValue = (valueInVw / 100) * window.innerWidth;
    return pixelValue;
  }
  const horizontalLayoutOffset = 58;
  const section1Height = convertVhToPx(100) - horizontalLayoutOffset;
  const section23Widths = vwToPx(50);
  const section2HeightInit =
    (convertVhToPx(100) - horizontalLayoutOffset) * 0.60;
  const section3HeightInit =
    (convertVhToPx(100) - horizontalLayoutOffset) * 0.40;
  const [section1Width, setSection1Width] = useState(section23Widths);
  const [section2Width, setSection2Width] = useState(section23Widths);
  const [section3Width, setSection3Width] = useState(section23Widths);
  const [section2Height, setSection2Height] = useState(section2HeightInit);
  const [section3Height, setSection3Height] = useState(section3HeightInit);

  const handleSection1Resize = (event, { size }) => {
    const newSection1Width = size.width;
    setSection1Width(newSection1Width);
    const remainingWidth = window.innerWidth - newSection1Width;
    const newSection23Width = remainingWidth;
    setSection2Width(newSection23Width);
    setSection3Width(newSection23Width);
  };

  const handleSection2Resize = (event, { size }) => {
    setSection2Width(section2Width);
    const newSection2Height = size.height;
    setSection2Height(size.height);
    const remainingHeight =
      window.innerHeight - newSection2Height - horizontalLayoutOffset;
    setSection3Height(remainingHeight);
    // setSection3Width(section2Width);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // calculate new section sizes based on current sizes of all sections
      const newWidths = vwToPx(50);
      setSection1Width(newWidths);
      setSection2Width(newWidths);
      setSection3Width(newWidths);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [ ]);

  return (
    <div>
      <div className="challenge-page">
        <div className="challenge-section-xs">{section1}</div>
        <div className="challenge-section-xs">{section2}</div>
        <div className="challenge-section-xs">{section3}</div>
        <ResizableBox
          width={section1Width}
          height={section1Height}
          minConstraints={[200, section1Height]}
          maxConstraints={[1400, section1Height]}
          onResize={handleSection1Resize}
          className="challenge-section"
        >
          <div>{section1}</div>
        </ResizableBox>
        <div className="right-side-challenge-layout">
          <ResizableBox
            width={section2Width}
            height={section2Height}
            minConstraints={[section2Width, 100]}
            maxConstraints={[section2Width, section1Height - 100]}
            onResize={handleSection2Resize}
            className="challenge-section"
          >
            <div>{section2}</div>
          </ResizableBox>
          <ResizableBox
            width={section3Width}
            height={section3Height}
            minConstraints={[section3Width, section3Height]}
            maxConstraints={[section3Width, section3Height]}
            className="challenge-section"
          >
            <div>{section3}</div>
          </ResizableBox>
        </div>
      </div>
    </div>
  );
}

export default ResizingWrapper

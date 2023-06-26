import React, {useRef, useEffect, useState} from 'react'
import './PopUp.scss'
import {BsXCircle} from 'react-icons/bs'
const PopUp = ({ children, className }) => {
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray[0];
  const content = childrenArray[1];

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const popupRef = useRef();
  const triggerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        handleClosePopup();
        console.log("outside");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popupRef, triggerRef]);
  return (
    <div className={className}>
      <div onClick={handleShowPopup} ref={triggerRef}>
        {trigger}
      </div>
      {showPopup && (
        <div className="blur">
          <div className="popup" ref={popupRef}>
            <div className="popup-close" onClick={handleClosePopup}>
              <BsXCircle />
            </div>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp
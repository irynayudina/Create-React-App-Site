import React, {useEffect} from 'react'
import { v4 as uuidV4 } from "uuid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const RedirectElem = () => {
    const location = useLocation();
    let { associatedProject_id } = location?.state || "not passed";
    console.log(location?.state);
    const navigate = useNavigate();
    useEffect(() => {
      if (associatedProject_id) {
        navigate(`/documents/${uuidV4()}`, {
          state: { associatedProject_id: associatedProject_id },
        });
      }
    }, [associatedProject_id]);
    
    return <div>{associatedProject_id}</div>;
}

export default RedirectElem
import React, {useState, useEffect} from 'react'
// import UserNav from '../Userpage/UserNav';
import UserCharts from '../UserCharts/UserCharts';
import UserProjects from '../UserProjects/UserProjects';
import UserPeople from '../UserPeople/UserPeople';
import UserDiscussions from '../UserDiscussions/UserDiscussions';
// import { useLocation } from "react-router-dom";
import PublicUserInfo from './PublicUserInfo';
import './PublicUserpage.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'
import { useParams } from "react-router-dom";

import PublicUserNav from './PublicUserNav';


const PublicUserpage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [actingUser, setActingUser] = useState(userInfo);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;
  const { id: userId } = useParams();
    const [subpage, setSubpage] = useState("#projects");
    const [pageContent, setPageContent] = useState();
    useEffect(() => {
      switch (subpage) {
        case "#projects":
          setPageContent(<UserProjects />);
          break;
        case "#charts":
          setPageContent(<UserCharts />);
          break;
        case "#people":
          setPageContent(<UserPeople />);
          break;
        case "#discussions":
          setPageContent(<UserDiscussions />);
          break;
      }
    }, [subpage]);
  useEffect(() => {
    if (userId == userInfo?._id) {
      navigate("/user#projects");
    }
  }, [userId]);
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfoResponse = await axios.get(
          `https://codeeditorbackend-production.up.railway.app/api/users/profile?userId=${userInfo?._id}`
        );
        console.log(userInfoResponse.data);
        setActingUser(userInfoResponse.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
      }
    };
    loadUserInfo();
  }, []);
  
  return (
    <div className="public-userpage">
      <div>
        <PublicUserInfo userId={userId} me={actingUser} />
        <PublicUserNav subpage={subpage} setSubpage={setSubpage} isPublic={true} />
      </div>
      <div className="userpage-content">{pageContent}</div>
    </div>
  );
}

export default PublicUserpage
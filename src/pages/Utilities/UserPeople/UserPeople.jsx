import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import "./UserPeople.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UserPeople = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: viewedUserId } = useParams();
  const userId = viewedUserId || userInfo._id;
  const [fromPublicPage, setFromPublicPage] = useState(viewedUserId);
  const [peopleArray, setPeopleArray] = useState([]);
  const [people, setPeople] = useState(peopleArray);
  const [filterParam, setFilter] = useState("0");
  const deletePersonHandler = async (idOfUser, i) => {
    let newList = [...people];
    newList.splice(i, 1);
    setPeople(newList);
    console.log(people);
    //unfollow request
    try {
      const response = await axios.post(
        `https://codeeditorbackend-production.up.railway.app/api/users/unfollow`,
        {
          userId: idOfUser,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
  const sortPeople = () => {
    let filtered = peopleArray;

    if (filterParam !== "0") {
      filtered = filtered.filter(
        (person) =>
          person.role[0] === filterParam || person.role[1] === filterParam
      );
    }
    setPeople(filtered);
  };
  useEffect(() => {
    sortPeople();
  }, [filterParam]);
  const loadPeopleOfUSer = async () => {
    try {
      const responsePeople = await axios.get(
        `https://codeeditorbackend-production.up.railway.app/api/users/people?user_id=${userId}`,
        { withCredentials: true }
      );
      setPeopleArray(responsePeople?.data);
      setPeople(responsePeople?.data);
      // console.log(responsePeople?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadPeopleOfUSer();
  }, []);

  return (
    <div className="peopleContainer">
      <div className="title-people">
        <h5>People</h5>
      </div>
      <div className="people-topsection">
        <Form.Select
          value={filterParam}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="0">All</option>
          <option value="following">Following</option>
          <option value="follower">Followers</option>
        </Form.Select>
      </div>
      <div className="people-display">
        {people.map((p, i) => (
          <div className="person-item" key={i}>
            <div className="person-info-group">
              <Link
                to={`/public/user/${p?.userID}#projects`}
                className="text-decoration-none black-link"
              >
                <div className="person-img"></div>
              </Link>
              <Link
                to={`/public/user/${p?.userID}#projects`}
                className="text-decoration-none black-link"
              >
                <div className="person-name">{p.name}</div>
                {p.role.map((r) => (
                  <Badge bg="secondary" className="bage-role" key={r}>
                    {r}
                  </Badge>
                ))}
              </Link>
            </div>
            {!fromPublicPage &&
            (p.role[0] === "following" || p.role[1] === "following") ? (
              <Button
                variant="outline-danger"
                size="sm"
                className="btn-center"
                onClick={() => deletePersonHandler(p?.userID, i)}
              >
                <BsFillTrashFill />
              </Button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPeople;

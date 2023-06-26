import React, {useState, useEffect} from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { logout } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserNav = ({ subpage, setSubpage, isPublic }) => {
  useEffect(() => {
    setSubpage(window.location.hash);
    window.addEventListener("hashchange", () => {
      setSubpage(window.location.hash);
    });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Nav className="list-group list-group-flush usernav">
        <div>
          <Nav.Link
            href="#projects"
            exact
            className={`list-group-item list-group-item-action py-2 ripple ${
              subpage == "#projects" ? "active" : ""
            }`}
            aria-current="true"
          >
            <span>Projects</span>
          </Nav.Link>
          <Nav.Link
            href="#discussions"
            exact
            className={`list-group-item list-group-item-action py-2 ripple ${
              subpage == "#discussions" ? "active" : ""
            }`}
            aria-current="true"
          >
            {/* <FaFileCode className="me-3" /> */}
            <span>Discussions</span>
          </Nav.Link>
        </div>
        <div>
          <Nav.Link
            href="#people"
            exact
            className={`list-group-item list-group-item-action py-2 ripple ${
              subpage == "#people" ? "active" : ""
            }`}
            aria-current="true"
          >
            {/* <FaFileCode className="me-3" /> */}
            <span>People</span>
          </Nav.Link>
          {!isPublic ? (
            <Nav.Link
              href="#settings"
              exact
              className={`list-group-item list-group-item-action py-2 ripple ${
                subpage == "#settings" ? "active" : ""
              }`}
              aria-current="true"
            >
              {/* <FaFileCode className="me-3" /> */}
              <span>Settings</span>
            </Nav.Link>
          ) : (
            ""
          )}
        </div>
        {!isPublic ? (
          <Nav.Link
            href="#signout"
            exact
            className={`last-link-middle list-group-item list-group-item-action py-2 ripple ${
              subpage == "#signout" ? "active" : ""
            }`}
            aria-current="true"
            onClick={logoutHandler}
          >
            {/* <FaFileCode className="me-3" /> */}
            <span>Sign Out</span>
          </Nav.Link>
        ) : (
          ""
        )}
      </Nav>
    </div>
  );
};

export default UserNav;

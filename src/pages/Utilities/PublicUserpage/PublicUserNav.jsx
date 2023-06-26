import React, {useEffect} from 'react'
import { Nav } from "react-bootstrap";

const PublicUserNav = ({ subpage, setSubpage }) => {
  useEffect(() => {
    setSubpage(window.location.hash);
    window.addEventListener("hashchange", () => {
      setSubpage(window.location.hash);
    });
  }, []);
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
        </div>
        <Nav.Link
          href="#discussions"
          exact
          className={`last-link-middle list-group-item list-group-item-action py-2 ripple ${
            subpage == "#discussions" ? "active" : ""
          }`}
          aria-current="true"
        >
          {/* <FaFileCode className="me-3" /> */}
          <span>Discussions</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default PublicUserNav
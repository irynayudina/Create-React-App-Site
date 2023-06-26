import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import './Navbar.scss'

import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice'
import {useNavigate} from 'react-router-dom'

const NavBar = (props) => {  
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  const [activeTab, setActiveTab] = useState(window.location.pathname)
    return (
      <Navbar
        bg={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
        variant="dark"
        expand="lg"
        className={props.theme}
      >
        <Container fluid={true}>
          <Navbar.Brand href="/">Code-Network &lt;/&gt;</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={activeTab == "/" ? "active" : ""}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/editor"
                exact="true"
                activeclassname="active"
                className={activeTab == "/editor" ? "active" : ""}
              >
                Editor
              </Nav.Link>
              <Nav.Link
                href="/discussions"
                className={activeTab == "/discussions" ? "active" : ""}
              >
                Discussions
              </Nav.Link>
              {/* <Nav.Link
                href="/challenges"
                className={activeTab == "/challenges" ? "active" : ""}
              >
                Challenges
              </Nav.Link> */}
              {/* <Nav.Link
                href="/collaboratory"
                className={activeTab == "/collaboratory" ? "active" : ""}
              >
                Collaboratory
              </Nav.Link> */}
              <Nav.Link
                href="/projects"
                className={activeTab == "/projects" ? "active" : ""}
              >
                Projects
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/user#projects">
                    My projects
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user#discussions">
                    Discussions
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user#people">
                    People
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/user#settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler} >
                    Sing out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto">
            <Container>
              <Button
                variant={`${
                  props.theme === "darktheme" ? "primary" : "secondary"
                }`}
                size="sm"
                onClick={() => {
                  props.setTheme("darktheme");
                  localStorage.setItem("mainThemeStored", "darktheme");
                }}
              >
                Dark
              </Button>
              <Button
                variant={`${
                  props.theme === "lighttheme" ? "primary" : "secondary"
                }`}
                size="sm"
                onClick={() => {
                  props.setTheme("lighttheme");
                  localStorage.setItem("mainThemeStored", "lighttheme");
                }}
              >
                Light
              </Button>
            </Container>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavBar
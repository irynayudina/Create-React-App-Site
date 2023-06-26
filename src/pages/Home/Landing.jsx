import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPuzzlePiece, FaComments, FaUsers } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <Container className=" landing-headers">
      <Row className="mt-5">
        <Col md={6}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            Welcome to Code-Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lead mb-4"
          >
            Connect with fellow developers, enhance your coding skills, and
            collaborate on projects.
          </motion.p>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-4"
          >
            <Link to="/login">
              <Button>Log In</Button>
            </Link>{" "}
            <Link to="/register">
              <Button>Sing Up</Button>
            </Link>
          </motion.div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={3}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-4"
          >
            <FaCode className="icon" />
            <h3>Code Editor</h3>
            <p>Write and run your code using our powerful code editor.</p>
          </motion.div>
        </Col>
        {/* <Col md={3}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mb-4"
          >
            <FaPuzzlePiece className="icon" />
            <h3>Challenges</h3>
            <p>Take on coding challenges to sharpen your skills.</p>
          </motion.div>
        </Col> */}
        <Col md={3}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mb-4"
          >
            <FaComments className="icon" />
            <h3>Discussions</h3>
            <p>
              Engage in meaningful discussions with the developer community.
            </p>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center mb-4"
          >
            <FaUsers className="icon" />
            <h3>Collaborative Editing Mode</h3>
            <p>
              Work together in real-time with other developers on the same
              codebase.
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
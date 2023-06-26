import React, {useState} from 'react'
import './Challenges.scss'
import { Container, Row, Col, Form } from "react-bootstrap";
import Difficulty from './Difficulty/Difficulty';
import Topics from './Topics/Topics';
import ChallengesList from './ChallengesList/ChallengesList';
import TopUsers from './TopUsers/TopUsers';

const Challenges = (props) => {
  const [difficultyLevelsSelected, setDifficultyLevelsSelected] = useState([]);
  const [topicsSelected, setTopicsSelected] = useState([]);
 
  return (
    <div>
      <Container fluid className="challenges-container">
        <Row className='challenge-tab-layout'>
          <Col sm={6} md={6} lg={3} xl={3} xxl={3} className="challenges-left">
            <Difficulty
              difficultyLevelsSelected={difficultyLevelsSelected}
              setDifficultyLevelsSelected={setDifficultyLevelsSelected}
            />
            <Topics topicsSelected={topicsSelected} setTopicsSelected={setTopicsSelected} />
          </Col>
          <Col sm={6} md={6} lg={3} xl={3} xxl={3}
            className="challenges-right order-sm-2 order-md-2 order-lg-3 order-xl-3 order-xxl-3">
            <div className="challenges-top-users">Top Users</div>
            <TopUsers />
          </Col>
          <Col sm={12} md={12} lg={6} xl={6} xxl={6}
            className="challenges-center order-sm-3 order-md-3 order-lg-2 order-xl-2 order-xxl-2">
            <ChallengesList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Challenges
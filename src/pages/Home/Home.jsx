import React from 'react'
import LettersContainer from '../../elements/AnimatedLetters/LettersContainer/LettersContainer'
import './Home.scss'
import LandingPage from './Landing'
const Home = () => {
  return (
    <div className='home-container'>
      <div className="landing-logo-animation">
      <LettersContainer lines={[`Code Network </>`]} />
      </div>
      <LandingPage />
    </div>
  )
}

export default Home
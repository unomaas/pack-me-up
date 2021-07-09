import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>Welcome to</h2>
      <img
        src="./images/PMUBlackReg-01.svg"
        alt="Pack Me Up Logo"
        width="250"
      />
      <h3>Your friendly neighborhood packing application!</h3>
      <br />

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Pack Me Up aims to be the world's best packing app, hand-made to be user-friendly, intuitive to learn, and even easier to use.
          </p>

          <p>
            Made for all the people who travel often and pack heavy, Pack Me Up will be taking a suitcase of stress off of your mind, by letting you organize everything you'd ever need to travel with into neat little boxes.
          </p>

          <p>
            Personally designed from the ground-up by the professional people-person, Ryan Maas, member of the Genocchi cohort, first of his name, coder of the Andals, and breaker of bugs.
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

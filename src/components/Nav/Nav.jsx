//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Nav.css';
// ⬇ Dependent functionality:
import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
//#endregion ⬆⬆ Document setup above. 


function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">

      <Link to="/home">
        {/* <h2 className="nav-title">Prime Solo Project</h2> */}
        <img className='header-image' src="./images/GenLogoWEmbedded.svg" height="50"></img>
      </Link>

      <div>
        <p className="nav-title">Pack Me Up!</p>
      </div>

      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>

    </div>
  );
}

export default Nav;

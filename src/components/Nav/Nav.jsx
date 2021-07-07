//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Nav.css';
// ⬇ Dependent functionality:
import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
//#endregion ⬆⬆ Document setup above. 


function Nav() {
  //#region ⬇⬇ All state variables below:
  const user = useSelector((store) => store.user);
  //#endregion ⬆⬆ All state variables above. 


  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">

      <Link to="/home">
        <img className='header-image' src="./images/GenLogoWEmbedded.svg" height="43"></img>
      </Link>

      <div className='nav-title'>
        <img className='header-logo' src="./images/PMUWhiteReg-01.svg" height="65" />
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

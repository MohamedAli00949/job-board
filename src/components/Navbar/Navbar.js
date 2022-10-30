import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function Navbar() {
  return (
    <div className='header'>
      <div className='logo-container'>
        <Link to="/">
          <img src='/images/logo.png' alt='logo' width="" height="" />
        </Link>
      </div>
      <div className='buttons'>
        <Link className='log-in' to="/auth">log in</Link>
        <Link className='post-job main-button' to="/job/new">Post a job</Link>
      </div>
    </div>
  );
}

export default Navbar;
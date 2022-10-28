import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

import ErrorVector from './ErrorVector';

import './style.css';
function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className='error-page'>
      {error.status === 404 && (
        <div className='image-container'><ErrorVector /></div>
      )}
      <div className='container'>
        <h1 style={{
          marginBlock: 10
        }}>Opps!</h1>
        <p style={{
          marginBlock: 10
        }}>Sorry, an unexpected error has occurred.</p>
        <p style={{
          marginBlock: 10
        }}>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link className='main-button' style={{
          marginBlock: 10
        }} to='/'>
          go to home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
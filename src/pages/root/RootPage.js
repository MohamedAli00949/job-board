import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@chakra-ui/react';

import './style.css'
import Jobs from './Tasks/Jobs';

const Navbar = lazy(() => import('../../components/Navbar/Navbar'));

function RootPage() {
  return (
    <Suspense fallback={<>
      <div className='container big-loading'>
        <CircularProgress isIndeterminate color='#00d363' thickness='6px' size="250px" />
      </div>
    </>}>
      <section className='upper-side'>
        <div className='container'>
          <Navbar />
          <div className='hero'>
            <div className='left'>
              <p>4536+ Jobs listed</p>
              <h1>Find your Dream Job</h1>
              <span>We provide online instant cash loans with quick approval that suit your term length</span>
              <a className='main-button' href="/#jobs">start applying now</a>
            </div>
            <div className='right'>
              <img src='/images/xillustration.png.pagespeed.ic 1.png' alt='' />
            </div>
          </div>
        </div>
      </section>
      <Jobs />
    </Suspense>
  );
}

export default RootPage;
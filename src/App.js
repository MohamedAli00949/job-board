import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Root from './pages/root/RootPage';
import ErrorPage from './pages/error/ErrorPage';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';

AOS.init();
const rooter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' errorElement={<ErrorPage />}>
      <Route path='/' element={<Root />} errorElement={<ErrorPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={rooter} />
  );
}

export default App;
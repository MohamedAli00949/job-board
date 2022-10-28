import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Root from './pages/root/RootPage';
import ErrorPage from './pages/error/ErrorPage';


import './App.css';

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
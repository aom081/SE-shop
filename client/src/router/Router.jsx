import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ],
  },
  {
    path: "/user",
    element: <div></div>
  }
]);

export default router
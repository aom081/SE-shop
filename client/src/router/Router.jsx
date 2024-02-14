import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import ProductList from '../pages/Shop/ProductList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/shop",
        element:<ProductList />
      }
    ],
  },
  {
    path: "/user",
    element: <div></div>
  }
]);

export default router
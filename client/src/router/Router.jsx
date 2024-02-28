import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import SignUp from '../components/SignUp';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

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
        path: "/shop",
        element: (
        <PrivateRouter>
        <ProductList />
         </PrivateRouter>
        )
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      }
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />
  },
  {
    path: "/signIn",
    element: <SignIn />
  }
]);

export default router
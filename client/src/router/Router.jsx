import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import SignUp from '../components/SignUp';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import Cart from '../pages/Shop/Cart';

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
        path: "/cart",
        element: (
          <PrivateRouter>
            <Cart />
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
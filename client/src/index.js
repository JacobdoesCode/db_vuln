import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login';
import Upload from './Upload';
import {createBrowserRouter,RouterProvider,Route,} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/upload",
      element: <Upload/>
    },
  ]);

root.render(
    <RouterProvider router={router} />
);
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './Login';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

root.render(
    <RouterProvider router={router} />
);
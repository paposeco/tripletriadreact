import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WaitingRoom from "./WaitingRoom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
        path: "/waitingroom",
        element: <WaitingRoom />,
    },
    {
        path: "/game",
        element: <App />,
    },
    { path: "/createuser", element: <Login /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

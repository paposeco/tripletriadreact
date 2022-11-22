import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WaitingRoom from "./WaitingRoom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <WaitingRoom />
    </React.StrictMode>
);

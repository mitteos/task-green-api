import { App } from "App";
import React from "react";
import ReactDOM from "react-dom/client";
import "styles/global.css";
import { Wrapper } from "context/Wrapper";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Wrapper>
        <App />
    </Wrapper>
);

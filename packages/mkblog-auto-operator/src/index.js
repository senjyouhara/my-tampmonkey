import ReactDOM from "react-dom";
import React from "react";
import App from "./app";
import config from "./config";

const el = document.createElement("div");
el.id = config.name + "-" + config.version;
document.body.appendChild(el);
ReactDOM.render(<App />, el);

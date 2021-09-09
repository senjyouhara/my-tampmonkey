import * as Styles from "./styles";
// @ts-ignore
import ReactDOM from "react-dom";
import { has } from "./sites";
import React from "react";
import App from "./app";

// if (has()) {
Styles.update();

const el = document.createElement("div");
document.body.appendChild(el);
ReactDOM.render(App, el);
// }

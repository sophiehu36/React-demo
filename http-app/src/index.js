import React from "react";
import ReactDOM from "react-dom";
import logService from "./services/logService";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

logService.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

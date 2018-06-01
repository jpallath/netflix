import React from "react";
import ReactDOM from "react-dom";
import Movie from "./containers/Movie";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(<Movie />, document.getElementById("root"));
registerServiceWorker();

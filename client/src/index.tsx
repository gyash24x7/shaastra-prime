import "./scss/app.scss";
import "@atlaskit/css-reset/dist/bundle.css";
import "@atlaskit/reduced-ui-pack/dist/bundle.css";

import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import AppRoutes from "./routes";
import * as serviceWorker from "./serviceWorker";

declare let module: any;

const AppWithHMR =
	process.env.NODE_ENV === "production" ? AppRoutes : hot(AppRoutes);

const renderApp = (Component: React.FC) => {
	ReactDOM.render(<Component />, document.getElementById("root"));
};

if (module.hot) {
	module.hot.accept("./routes", () => {
		const NextApp = require("./routes").default;
		renderApp(NextApp);
	});
}

renderApp(AppWithHMR);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

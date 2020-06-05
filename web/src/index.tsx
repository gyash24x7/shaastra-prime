import "antd/dist/antd.dark.less";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./styles/App.scss";

declare let module: any;

const renderApp = (Component: React.FC) => {
	ReactDOM.render(<Component />, document.getElementById("root"));
};

if (module.hot) {
	module.hot.accept("./routes", () => {
		const NextApp = require("./App").default;
		renderApp(NextApp);
	});
}

renderApp(App);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset/dist/bundle.css";
import "./scss/app.scss";
import { AppRoutes } from "./routes";
import * as serviceWorker from "./serviceWorker";

const renderApp = ( Component: React.FC ) => {
	ReactDOM.render( <Component/>, document.getElementById( "root" ) );
};

renderApp( AppRoutes );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

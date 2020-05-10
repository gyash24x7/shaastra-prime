import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
/* Theme variables */
import "antd/dist/antd.dark.min.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginScreen } from "./components/Login";
import "./theme/variables.css";

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route path="/login" component={LoginScreen} exact />
				<Route exact path="/" render={() => <Redirect to="/login" />} />
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;

import React from "react";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = () => (
	<Provider store={store}>
		<Navigation />
	</Provider>
);

export default App;

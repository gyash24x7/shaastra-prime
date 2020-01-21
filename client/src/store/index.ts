import { applyMiddleware, compose, createStore } from "redux";
import { reducer } from "./reducers";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

declare var window: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [ logger ];

export const store = createStore(
	reducer,
	composeEnhancers( applyMiddleware( ...middlewares ) )
);

export const persistor = persistStore( store );

store.subscribe(() => {
	console.log(store.getState());
});

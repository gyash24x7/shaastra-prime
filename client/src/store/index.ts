import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import { persistStore } from "redux-persist";
import { initialStore } from "./store";
import logger from "redux-logger";

declare var window: any;

const middlewares = [logger];

export const store = createStore(reducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

store.subscribe(() => {
	console.log(store.getState());
});

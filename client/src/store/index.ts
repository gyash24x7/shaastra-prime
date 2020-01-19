import { createStore } from "redux";
import { reducer } from "./reducers";
import { initialStore } from "./store";

export const store = createStore(reducer, initialStore);

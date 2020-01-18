import { combineReducers } from "redux";
import { ChannelsReducer as channels } from "./Channels";

export const reducer = combineReducers({ channels });

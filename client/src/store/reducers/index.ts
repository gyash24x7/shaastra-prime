import { combineReducers } from "redux";
import { ChannelsReducer as channels } from "./Channels";
import { DepartmentsReducer as departments } from "./Departments";
import { UserReducer as user } from "./User";

export const reducer = combineReducers({ channels, departments, user });

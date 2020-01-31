import { Application } from "../types";
import users from "./User";
import departments from "./Department";

export default (app: Application) => {
	app.configure(users);
	app.configure(departments);
};

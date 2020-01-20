import { UserAction, User } from "../../typings";
import { user as defaultUser } from "./../store";

export const UserReducer = (user = null as User, { type }: UserAction) => {
	switch (type) {
		case "LOGIN":
			return defaultUser;

		default:
			return null as User;
	}
};

import { User, UserAction } from "../../typings";
import { user as defaultUser } from "./../store";

export const UserReducer = (
	user = null as User,
	{ type }: UserAction
) => {
	switch ( type ) {
		case "CREATE_USER":
			return defaultUser;

		case "LOGIN":
			return defaultUser;

		default:
			return user as User;
	}
};

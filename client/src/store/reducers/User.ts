import { UserAction } from "../../typings";
import { user as defaultUser } from "./../store";

export const UserReducer = (user = defaultUser, { type }: UserAction) => {
	switch (type) {
		default:
			return user;
	}
};

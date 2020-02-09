import { AuthChecker } from "type-graphql";
import { GraphQLContext } from ".";
import { User } from "../models/User";

export const authChecker: AuthChecker<GraphQLContext> = async ({ context }) => {
	const id = context.req.session!.userId;
	if (!id) return false;

	const user = await User.findOne(id);
	if (!user) return false;

	return true;
};

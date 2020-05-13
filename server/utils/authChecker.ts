import dotenv from "dotenv";
import { AuthChecker } from "type-graphql";
import { GraphQLContext } from "utils";
dotenv.config();

export const authChecker: AuthChecker<GraphQLContext> = async (
	{ context: { user } },
	roles
) => {
	if (!user) return false;

	if (roles.length === 0) return true;

	if (roles.includes(user.role)) return true;

	return false;
};

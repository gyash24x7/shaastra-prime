import { AuthChecker } from "type-graphql";

import { GraphQLContext } from ".";
import { prisma } from "../prisma";

export const authChecker: AuthChecker<GraphQLContext> = async ({ context }) => {
	const id = context.req.session!.userId;
	if (!id) return false;

	const user = await prisma.user.findOne({ where: { id } });
	if (!user) return false;

	return true;
};

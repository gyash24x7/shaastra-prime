import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: GraphQLContext) {
		const id = req.session!.userId;
		if (!id) return null;

		return prisma.user.findOne(id);
	}
}

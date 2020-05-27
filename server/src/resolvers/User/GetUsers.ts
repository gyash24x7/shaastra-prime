import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetUsersResolver {
	@Query(() => [User])
	async getUsers(@Ctx() { prisma }: GraphQLContext) {
		return prisma.user.findMany();
	}

	@Authorized()
	@Query(() => User)
	async getUser(
		@Arg("userId") userId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.user.findOne({ where: { id: userId } });
	}
}

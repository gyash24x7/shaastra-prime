import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { prisma } from "../../prisma";

@Resolver()
export class GetUsersResolver {
	@Query(() => [User])
	async getUsers() {
		return prisma.user.findMany();
	}

	@Authorized()
	@Query(() => User)
	async getUser(@Arg("userId") userId: string) {
		return prisma.user.findOne({ where: { id: userId } });
	}
}

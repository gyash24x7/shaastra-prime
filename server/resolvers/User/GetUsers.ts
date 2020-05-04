import { Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { prisma } from "../../prisma";

@Resolver()
export class GetUsersResolver {
	@Query(() => [User])
	async getUsers() {
		return prisma.user.findMany();
	}
}

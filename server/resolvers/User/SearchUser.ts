import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { prisma } from "../../prisma";

@Resolver()
export class SearchUserResolver {
	@Authorized()
	@Query(() => [User])
	async searchUser(@Arg("searchStr") searchStr: string) {
		const users = await prisma.user.findMany({
			where: { name: { contains: searchStr } },
			first: 10
		});
		return users;
	}
}

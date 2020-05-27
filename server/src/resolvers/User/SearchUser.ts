import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class SearchUserResolver {
	@Authorized()
	@Query(() => [User])
	async searchUser(
		@Arg("searchStr") searchStr: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const users = await prisma.user.findMany({
			where: { name: { contains: searchStr } },
			first: 10
		});
		return users;
	}
}

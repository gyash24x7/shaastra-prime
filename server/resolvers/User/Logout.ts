import { Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class logoutResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: GraphQLContext) {
		return new Promise((resolve, reject) => {
			req.session!.destroy((err) => {
				if (err) reject(false);
				else {
					res.clearCookie("qid");
					resolve(true);
				}
			});
		});
	}
}

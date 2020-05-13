import dotenv from "dotenv";
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";
dotenv.config();

@Resolver()
export class MeResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { user }: GraphQLContext) {
		return user;
	}
}

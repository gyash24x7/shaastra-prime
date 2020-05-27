import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Department } from "../../models/Department";
import { User } from "../../models/User";
import { GraphQLContext } from "../../utils";

@Resolver(User)
export class UserFieldResolvers {
	@FieldResolver(() => [Department])
	async department(@Root() { id }: User, @Ctx() { prisma }: GraphQLContext) {
		return prisma.user.findOne({ where: { id } }).department();
	}
}

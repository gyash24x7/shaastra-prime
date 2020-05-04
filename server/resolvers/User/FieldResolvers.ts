import { FieldResolver, Resolver, Root } from "type-graphql";
import { Department } from "../../models/Department";
import { User } from "../../models/User";
import { prisma } from "../../prisma";

@Resolver(User)
export class UserFieldResolvers {
	@FieldResolver(() => [Department])
	async department(@Root() { id }: User) {
		return prisma.user.findOne({ where: { id } }).department();
	}
}

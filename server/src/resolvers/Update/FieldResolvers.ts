import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Update } from "../../models/Update";
import { GraphQLContext } from "../../utils";

@Resolver(Update)
export class UpdateFieldResolvers {
	@FieldResolver()
	postedBy(@Root() { id }: Update, @Ctx() { prisma }: GraphQLContext) {
		return prisma.update.findOne({ where: { id } }).postedBy();
	}

	@FieldResolver()
	byDept(@Root() { id }: Update, @Ctx() { prisma }: GraphQLContext) {
		return prisma.update.findOne({ where: { id } }).byDept();
	}
}

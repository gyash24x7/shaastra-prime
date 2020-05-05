import { FieldResolver, Resolver, Root } from "type-graphql";
import { Update } from "../../models/Update";
import { prisma } from "../../prisma";

@Resolver(Update)
export class UpdateFieldResolvers {
	@FieldResolver()
	postedBy(@Root() { id }: Update) {
		return prisma.update.findOne({ where: { id } }).postedBy();
	}

	@FieldResolver()
	byDept(@Root() { id }: Update) {
		return prisma.update.findOne({ where: { id } }).byDept();
	}
}

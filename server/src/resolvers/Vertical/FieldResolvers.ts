import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Media } from "../../models/Media";
import { User } from "../../models/User";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext } from "../../utils";

@Resolver(Vertical)
export class VerticalFieldResolvers {
	@FieldResolver(() => Media)
	async image(@Root() { id }: Vertical, @Ctx() { prisma }: GraphQLContext) {
		return await prisma.vertical.findOne({ where: { id } }).image();
	}

	@FieldResolver(() => User)
	async updatedBy(@Root() { id }: Vertical, @Ctx() { prisma }: GraphQLContext) {
		return await prisma.vertical.findOne({ where: { id } }).updatedBy();
	}
}

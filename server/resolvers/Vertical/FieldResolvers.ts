import { FieldResolver, Resolver, Root } from "type-graphql";
import { Media } from "../../models/Media";
import { User } from "../../models/User";
import { Vertical } from "../../models/Vertical";
import { prisma } from "../../prisma";

@Resolver(Vertical)
export class VerticalFieldResolvers {
	@FieldResolver(() => Media)
	async image(@Root() { id }: Vertical) {
		return await prisma.vertical.findOne({ where: { id } }).image();
	}

	@FieldResolver(() => User)
	async updatedBy(@Root() { id }: Vertical) {
		return await prisma.vertical.findOne({ where: { id } }).updatedBy();
	}
}

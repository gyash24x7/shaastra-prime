import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Message } from "../../models/Message";
import { GraphQLContext } from "../../utils";

@Resolver(Message)
export class MessageFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Message, @Ctx() { prisma }: GraphQLContext) {
		return prisma.message.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	async likes(@Root() { id }: Message, @Ctx() { prisma }: GraphQLContext) {
		let users = await prisma.message.findOne({ where: { id } }).likedBy();
		return users.length;
	}

	@FieldResolver()
	media(@Root() { id }: Message, @Ctx() { prisma }: GraphQLContext) {
		return prisma.message.findOne({ where: { id } }).media();
	}

	@FieldResolver()
	async liked(
		@Root() { id }: Message,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const users = await prisma.message
			.findOne({ where: { id } })
			.likedBy({ where: { id: user?.id } });

		return users.length !== 0;
	}
}

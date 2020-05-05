import { FieldResolver, Resolver, Root } from "type-graphql";
import { Message } from "../../models/Message";
import { prisma } from "../../prisma";

@Resolver(Message)
export class MessageFieldResolvers {
	@FieldResolver()
	createdBy(@Root() { id }: Message) {
		return prisma.message.findOne({ where: { id } }).createdBy();
	}

	@FieldResolver()
	async likes(@Root() { id }: Message) {
		let users = await prisma.message.findOne({ where: { id } }).likedBy();
		return users.length;
	}

	@FieldResolver()
	media(@Root() { id }: Message) {
		return prisma.message.findOne({ where: { id } }).media();
	}
}

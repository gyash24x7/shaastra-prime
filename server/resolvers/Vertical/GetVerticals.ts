import { Authorized, Query, Resolver } from "type-graphql";
import { Vertical } from "../../models/Vertical";
import { prisma } from "../../prisma";

@Resolver()
export class GetVerticalsResolver {
	@Authorized()
	@Query(() => [Vertical])
	async getVerticals() {
		return await prisma.vertical.findMany({ include: { image: true } });
	}
}

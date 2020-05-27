import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetVerticalsResolver {
	@Authorized()
	@Query(() => [Vertical])
	async getVerticals(@Ctx() { prisma }: GraphQLContext) {
		return await prisma.vertical.findMany({ include: { image: true } });
	}
}

import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Event } from "../../models/Event";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetEventsResolver {
	@Query(() => [Event])
	async getEventsByVertical(
		@Arg("id") id: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		return await prisma.vertical.findOne({ where: { id } }).events();
	}

	@Authorized()
	@Query(() => Event, { nullable: true })
	async getEvent(@Arg("id") id: string, @Ctx() { prisma }: GraphQLContext) {
		return await prisma.event.findOne({ where: { id } });
	}
}

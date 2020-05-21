import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Event } from "../../models/Event";
import { prisma } from "../../prisma";

@Resolver()
export class GetEventsResolver {
	@Query(() => [Event])
	async getEventsByVertical(@Arg("id") id: string) {
		return await prisma.vertical.findOne({ where: { id } }).events();
	}

	@Authorized()
	@Query(() => Event, { nullable: true })
	async getEvent(@Arg("id") id: string) {
		return await prisma.event.findOne({ where: { id } });
	}
}

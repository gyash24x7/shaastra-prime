import { Arg, Authorized, Query, Resolver } from "type-graphql";
import { Event } from "../../models/Event";
import { Vertical } from "../../models/Vertical";

@Resolver()
export class GetEventsResolver {
	@Query(() => [Event])
	async getEventsByVertical(@Arg("id") id: string) {
		const vertical = await Vertical.findOne(id);
		if (!vertical) throw new Error("Vertical not found!");

		return vertical?.events;
	}

	@Authorized()
	@Query(() => Event, { nullable: true })
	async getEvent(@Arg("id") id: string) {
		return await Event.findOne(id);
	}
}

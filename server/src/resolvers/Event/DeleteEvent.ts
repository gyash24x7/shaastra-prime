import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Event } from "../../models/Event";

@Resolver()
export class DeleteEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("id") id: string) {
		const { affected } = await Event.delete(id);
		return !!affected;
	}
}

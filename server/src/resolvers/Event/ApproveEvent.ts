import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Event } from "../../models/Event";

@Resolver()
export class ApproveEventResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(@Arg("id") eventId: string) {
		const { affected } = await Event.update(eventId, { approved: true });
		return !!affected;
	}
}

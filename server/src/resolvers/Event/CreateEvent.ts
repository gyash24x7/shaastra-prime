import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateEventInput } from "../../inputs/Event/CreateEvent";
import { Event } from "../../models/Event";
import { Media } from "../../models/Media";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext, MediaType } from "../../utils";

@Resolver()
export class CreateEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createEvent(
		@Arg("data") data: CreateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		let media = await Media.findOne();
		if (data.imageUrl) {
			media = await Media.create({
				url: data.imageUrl,
				type: MediaType.IMAGE,
				uploadedBy: Promise.resolve(user)
			}).save();
		}

		const event = await Event.create({
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			vertical: Vertical.findOne(data.verticalId),
			updatedBy: Promise.resolve(user),
			image: Promise.resolve(media),
			eventTabs: JSON.stringify(
				data.eventTabTitles.map((title, i) => ({
					title,
					content: data.eventTabContents[i]
				}))
			)
		}).save();

		return !!event;
	}
}

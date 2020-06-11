import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateEventInput } from "../../inputs/Event/CreateEvent";
import { Event } from "../../models/Event";
import { EventTab } from "../../models/EventTab";
import { Media } from "../../models/Media";
import { Vertical } from "../../models/Vertical";
import { defaultImageUrl, GraphQLContext, MediaType } from "../../utils";

@Resolver()
export class CreateEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createEvent(
		@Arg("data") data: CreateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		const eventTabs = EventTab.create(
			data.eventTabTitles.map((title, i) => ({
				title,
				content: data.eventTabContents[i]
			}))
		);

		const event = await Event.create({
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			vertical: Vertical.findOne(data.verticalId),
			updatedBy: Promise.resolve(user),
			image: Media.create({
				url: data.imageUrl || defaultImageUrl,
				type: MediaType.IMAGE,
				uploadedBy: Promise.resolve(user)
			}).save(),
			eventTabs
		}).save();

		return !!event;
	}
}

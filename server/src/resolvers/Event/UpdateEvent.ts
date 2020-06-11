import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateEventInput } from "../../inputs/Event/UpdateEvent";
import { Event } from "../../models/Event";
import { EventTab } from "../../models/EventTab";
import { Media } from "../../models/Media";
import { defaultImageUrl, GraphQLContext, MediaType } from "../../utils";

@Resolver()
export class UpdateEventResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async updateEvent(
		@Arg("data") data: UpdateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		const eventTabs = EventTab.create(
			data.eventTabTitles.map((title, i) => ({
				title,
				content: data.eventTabContents[i]
			}))
		);

		const { affected } = await Event.update(data.id, {
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			eventTabs,
			image: Media.create({
				url: data.imageUrl || defaultImageUrl,
				type: MediaType.IMAGE,
				uploadedBy: Promise.resolve(user)
			}).save(),
			updatedBy: Promise.resolve(user)
		});

		return !!affected;
	}
}

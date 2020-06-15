import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateEventInput } from "../../inputs/Event";
import { Event } from "../../models/Event";
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
		let media = await Media.findOne();
		if (data.imageUrl) {
			media = await Media.create({
				url: data.imageUrl || defaultImageUrl,
				type: MediaType.IMAGE,
				uploadedBy: Promise.resolve(user)
			}).save();
		}

		const { affected } = await Event.update(data.id, {
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			image: Promise.resolve(media),
			updatedBy: Promise.resolve(user),
			eventTabs: JSON.stringify(
				data.eventTabTitles.map((title, i) => ({
					title,
					content: data.eventTabContents[i]
				}))
			)
		});

		return !!affected;
	}
}

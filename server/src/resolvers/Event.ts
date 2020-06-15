import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateEventInput, UpdateEventInput } from "../inputs/Event";
import { Event } from "../models/Event";
import { Media } from "../models/Media";
import { Vertical } from "../models/Vertical";
import { defaultImageUrl, GraphQLContext, MediaType } from "../utils";

@Resolver()
export class EventResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(@Arg("id") eventId: string) {
		const { affected } = await Event.update(eventId, { approved: true });
		return !!affected;
	}

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

	@Authorized()
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("id") id: string) {
		const { affected } = await Event.delete(id);
		return !!affected;
	}

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

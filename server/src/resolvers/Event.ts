import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { Event } from "../entities/Event";
import { Media } from "../entities/Media";
import { CreateEventInput, UpdateEventInput } from "../inputs/Event";
import { GraphQLContext, MediaType } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class EventResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(@Arg("id") eventId: string) {
		const { affected } = await Event.update(eventId, { approved: true });
		return affected === 1;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createEvent(
		@Arg("data") data: CreateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (data.imageUrl) {
			image = Media.create({
				url: data.imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			});
		}

		const event = await Event.create({
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			verticalId: data.verticalId,
			updatedById: user.id,
			image,
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
	async getEventsByVertical(@Arg("id") id: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Event
		);

		const events = await Event.find({
			where: { verticalId: id },
			select,
			relations
		});

		return events;
	}

	@Authorized()
	@Query(() => Event, { nullable: true })
	async getEvent(@Arg("id") id: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Event
		);

		const event = await Event.findOne(id, { select, relations });
		return event;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async updateEvent(
		@Arg("data") data: UpdateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (data.imageUrl) {
			image = Media.create({
				url: data.imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			});
		}

		const { affected } = await Event.update(data.id, {
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			updatedById: user.id,
			image,
			eventTabs: JSON.stringify(
				data.eventTabTitles.map((title, i) => ({
					title,
					content: data.eventTabContents[i]
				}))
			)
		});

		return affected === 1;
	}
}

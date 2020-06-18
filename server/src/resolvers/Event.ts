import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Event } from "../entities/Event";
import { Media } from "../entities/Media";
import { Registration } from "../entities/Registration";
import { User } from "../entities/User";
import { Vertical } from "../entities/Vertical";
import { CreateEventInput, UpdateEventInput } from "../inputs/Event";
import { GraphQLContext, MediaType } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

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
			image = new Media();
			image.url = data.imageUrl;
			image.uploadedById = user.id;
			image.type = MediaType.IMAGE;
			image = await image.save();
		}

		const event = await Event.create({
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			verticalId: data.verticalId,
			updatedById: user.id,
			imageId: image?.id,
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
		const { select, relations } = getSelectAndRelation(info, Event);

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
		const { select, relations } = getSelectAndRelation(info, Event);
		return Event.findOne(id, { select, relations });
	}

	@Authorized()
	@Mutation(() => Boolean)
	async updateEvent(
		@Arg("data") data: UpdateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (data.imageUrl) {
			image = await Media.create({
				url: data.imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			}).save();
		}

		const { affected } = await Event.update(data.id, {
			name: data.name,
			info: data.info,
			paid: data.paid,
			registrationType: data.registrationType,
			updatedById: user.id,
			imageId: image?.id,
			eventTabs: JSON.stringify(
				data.eventTabTitles.map((title, i) => ({
					title,
					content: data.eventTabContents[i]
				}))
			)
		});

		return affected === 1;
	}

	@FieldResolver()
	async image(@Root() { imageId, image }: Event) {
		if (image) return image;
		return Media.findOne(imageId);
	}

	@FieldResolver()
	async updatedBy(@Root() { updatedBy, updatedById }: Event) {
		if (updatedBy) return updatedBy;
		return User.findOne(updatedById);
	}

	@FieldResolver()
	async vertical(@Root() { verticalId, vertical }: Event) {
		if (vertical) return vertical;
		return Vertical.findOne(verticalId);
	}

	@FieldResolver()
	async registrations(@Root() { registrations, id }: Event) {
		if (registrations) return registrations;
		return Registration.find({ where: { eventId: id } });
	}
}

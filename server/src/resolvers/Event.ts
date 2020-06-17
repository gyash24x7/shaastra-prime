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
import { InjectRepository } from "typeorm-typedi-extensions";
import { Event } from "../entities/Event";
import { Media } from "../entities/Media";
import { CreateEventInput, UpdateEventInput } from "../inputs/Event";
import { EventRepository } from "../repositories/Event";
import { MediaRepository } from "../repositories/Media";
import { GraphQLContext, MediaType } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class EventResolver {
	@InjectRepository()
	private readonly eventRepo: EventRepository;

	@InjectRepository()
	private readonly mediaRepo: MediaRepository;

	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async approveEvent(@Arg("id") eventId: string) {
		const event = await this.eventRepo.save({ id: eventId, approved: true });
		return !!event;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async createEvent(
		@Arg("data") data: CreateEventInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (data.imageUrl) {
			image = this.mediaRepo.create({
				url: data.imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			});
		}

		const event = await this.eventRepo.save({
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
		});

		return !!event;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("id") id: string) {
		const { affected } = await this.eventRepo.delete(id);
		return !!affected;
	}

	@Query(() => [Event])
	async getEventsByVertical(@Arg("id") id: string, @Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.eventRepo
		);

		const events = await this.eventRepo.find({
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
			this.eventRepo
		);

		const event = await this.eventRepo.findOne(id, { select, relations });
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
			image = this.mediaRepo.create({
				url: data.imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			});
		}

		const event = await this.eventRepo.save({
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

		return !!event;
	}
}

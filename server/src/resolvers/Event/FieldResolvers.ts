import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Event } from "../../models/Event";
import { EventTab } from "../../models/EventTab";
import { Media } from "../../models/Media";
import { Registration } from "../../models/Registration";
import { User } from "../../models/User";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext } from "../../utils";

@Resolver(Event)
export class EventFieldResolvers {
	@FieldResolver(() => User)
	async updatedBy(@Root() { id }: Event, @Ctx() { prisma }: GraphQLContext) {
		return prisma.event.findOne({ where: { id } }).updatedBy();
	}

	@FieldResolver(() => EventTab)
	async eventsTab(@Root() { id }: Event, @Ctx() { prisma }: GraphQLContext) {
		return prisma.event.findOne({ where: { id } }).eventTabs();
	}

	@FieldResolver(() => Vertical)
	async vertical(@Root() { id }: Event, @Ctx() { prisma }: GraphQLContext) {
		return prisma.event.findOne({ where: { id } }).vertical();
	}

	@FieldResolver(() => [Registration])
	async registrations(
		@Root() { id }: Event,
		@Ctx() { prisma }: GraphQLContext
	) {
		return prisma.event.findOne({ where: { id } }).registrations();
	}

	@FieldResolver(() => Media)
	async image(@Root() { id }: Event, @Ctx() { prisma }: GraphQLContext) {
		return prisma.event.findOne({ where: { id } }).image();
	}
}

import { Media } from "models/Media";
import { Registration } from "models/Registration";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { Event } from "../../models/Event";
import { EventTab } from "../../models/EventTab";
import { User } from "../../models/User";
import { Vertical } from "../../models/Vertical";
import { prisma } from "../../prisma";

@Resolver(Event)
export class EventFieldResolvers {
	@FieldResolver(() => User)
	async updatedBy(@Root() { id }: Event) {
		return prisma.event.findOne({ where: { id } }).updatedBy();
	}

	@FieldResolver(() => EventTab)
	async eventsTab(@Root() { id }: Event) {
		return prisma.event.findOne({ where: { id } }).eventTabs();
	}

	@FieldResolver(() => Vertical)
	async vertical(@Root() { id }: Event) {
		return prisma.event.findOne({ where: { id } }).vertical();
	}

	@FieldResolver(() => [Registration])
	async registrations(@Root() { id }: Event) {
		return prisma.event.findOne({ where: { id } }).registrations();
	}

	@FieldResolver(() => Media)
	async image(@Root() { id }: Event) {
		return prisma.event.findOne({ where: { id } }).image();
	}
}

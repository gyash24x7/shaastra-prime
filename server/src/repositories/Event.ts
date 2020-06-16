import { EntityRepository, Repository } from "typeorm";
import { Event } from "../entities/Event";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
	primaryFields = [
		"id",
		"name",
		"rank",
		"info",
		"updatedOn",
		"approved",
		"paid",
		"eventTabs",
		"registrationType"
	];

	relationalFields = ["updatedBy", "image", "vertical", "registrations"];
}

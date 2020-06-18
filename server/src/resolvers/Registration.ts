import { FieldResolver, Resolver, Root } from "type-graphql";
import { Event } from "../entities/Event";
import { Participant } from "../entities/Participant";
import { Registration } from "../entities/Registration";
import { Team } from "../entities/Team";

@Resolver(Registration)
export class RegistrationResolver {
	@FieldResolver()
	async team(@Root() { teamId, team }: Registration) {
		if (team) return team;
		return Team.findOne(teamId);
	}

	@FieldResolver()
	async participant(@Root() { participant, participantId }: Registration) {
		if (participant) return participant;
		return Participant.findOne(participantId);
	}

	@FieldResolver()
	async event(@Root() { eventId, event }: Registration) {
		if (event) return event;
		return Event.findOne(eventId);
	}
}

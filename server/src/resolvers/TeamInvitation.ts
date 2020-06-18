import { FieldResolver, Resolver, Root } from "type-graphql";
import { Participant } from "../entities/Participant";
import { Team } from "../entities/Team";
import { TeamInvitation } from "../entities/TeamInvitation";

@Resolver(TeamInvitation)
export class TeamInvitationResolver {
	@FieldResolver()
	async team(@Root() { teamId, team }: TeamInvitation) {
		if (team) return team;
		return Team.findOne(teamId);
	}

	@FieldResolver()
	async participant(@Root() { participant, participantId }: TeamInvitation) {
		if (participant) return participant;
		return Participant.findOne(participantId);
	}
}

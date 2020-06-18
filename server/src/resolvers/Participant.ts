import { FieldResolver, Resolver, Root } from "type-graphql";
import { Participant } from "../entities/Participant";
import { Registration } from "../entities/Registration";
import { TeamInvitation } from "../entities/TeamInvitation";

@Resolver(Participant)
export class ParticipantResolver {
	@FieldResolver()
	async registrations(@Root() { registrations, id }: Participant) {
		if (registrations) return registrations;
		return Registration.find({ where: { participantId: id } });
	}

	@FieldResolver()
	async invitations(@Root() { invitations, id }: Participant) {
		if (invitations) return invitations;
		return TeamInvitation.find({ where: { participantId: id } });
	}
}

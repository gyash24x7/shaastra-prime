import { FieldResolver, Resolver, Root } from "type-graphql";
import { Registration } from "../entities/Registration";
import { Team } from "../entities/Team";
import { TeamInvitation } from "../entities/TeamInvitation";

@Resolver(Team)
export class TeamResolver {
	@FieldResolver()
	async registrations(@Root() { registrations, id }: Team) {
		if (registrations) return registrations;
		return Registration.find({ where: { teamId: id } });
	}

	@FieldResolver()
	async invitations(@Root() { invitations, id }: Team) {
		if (invitations) return invitations;
		return TeamInvitation.find({ where: { teamId: id } });
	}
}

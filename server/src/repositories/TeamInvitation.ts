import { EntityRepository, Repository } from "typeorm";
import { TeamInvitation } from "../entities/TeamInvitation";

@EntityRepository(TeamInvitation)
export class TeamInvitationRepository extends Repository<TeamInvitation> {
	primaryKeys = ["id", "status"];
	relationalFields = ["team", "participant"];
}

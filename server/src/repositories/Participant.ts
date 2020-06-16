import { EntityRepository, Repository } from "typeorm";
import { Participant } from "../entities/Participant";

@EntityRepository(Participant)
export class ParticipantRepository extends Repository<Participant> {
	primaryFields = [
		"id",
		"name",
		"email",
		"shaastraID",
		"shaastraQR",
		"mobile",
		"gender",
		"college",
		"city",
		"state"
	];

	relationalFields = ["registrations", "invitations"];
}

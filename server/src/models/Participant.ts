import { Field, ID, ObjectType } from "type-graphql";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@ObjectType("Participant")
export class Participant {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() shaastraID: string;
	@Field() shaastraQR: string;
	@Field() email: string;
	@Field() password: string;
	@Field() mobile: string;
	@Field() gender: string;
	@Field() college: string;
	@Field() city: string;
	@Field() state: string;
	@Field(() => [Registration]) registrations: Registration[];
	@Field(() => [TeamInvitation]) invitations: TeamInvitation[];
}

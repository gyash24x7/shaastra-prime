import { Field, ID, ObjectType } from "type-graphql";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@ObjectType("Team")
export class Team {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field(() => [TeamInvitation]) invitations: TeamInvitation[];
	@Field(() => [Registration]) registrations: Registration[];
}

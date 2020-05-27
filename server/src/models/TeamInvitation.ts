import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { InviteStatus } from "../utils";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(InviteStatus, { name: "InviteStatus" });

@ObjectType("TeamInvitation")
export class TeamInvitation {
	@Field(() => ID) id: string;
	@Field(() => InviteStatus) status: InviteStatus;
	@Field(() => Team) team: Team;
	@Field(() => Participant) participant: Participant;
}

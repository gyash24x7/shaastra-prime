import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InviteStatus } from "../utils";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(InviteStatus, { name: "InviteStatus" });

@Entity("TeamInvitation")
@ObjectType("TeamInvitation")
export class TeamInvitation {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: InviteStatus, default: InviteStatus.PENDING })
	@Field(() => InviteStatus)
	status: InviteStatus;

	@Field(() => Team) team: Team;
	@Field(() => Participant) participant: Participant;
}

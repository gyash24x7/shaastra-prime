import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

	@ManyToOne(() => Team, (team) => team.invitations)
	@Field(() => Team)
	team: Team;

	@ManyToOne(() => Participant, (participant) => participant.invitations)
	@Field(() => Participant)
	participant: Participant;
}

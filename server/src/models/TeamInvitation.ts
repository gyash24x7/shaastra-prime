import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { InviteStatus } from "../utils";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(InviteStatus, { name: "InviteStatus" });

@Entity("TeamInvitation")
@ObjectType("TeamInvitation")
export class TeamInvitation extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: InviteStatus, default: InviteStatus.PENDING })
	@Field(() => InviteStatus)
	status: InviteStatus;

	@ManyToOne(() => Team, (team) => team.invitations, { lazy: true })
	@Field(() => Team)
	team: Promise<Team>;

	@Column()
	teamId: string;

	@ManyToOne(() => Participant, (participant) => participant.invitations, {
		lazy: true
	})
	@Field(() => Participant)
	participant: Promise<Participant>;

	@Column()
	participantId: string;
}

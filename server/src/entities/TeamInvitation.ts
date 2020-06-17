import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { InviteStatus } from "../utils";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(InviteStatus, { name: "InviteStatus" });

@Entity("TeamInvitation")
@ObjectType("TeamInvitation")
export class TeamInvitation extends BaseEntity {
	primaryKeys = ["id", "status"];
	static relationalFields = ["team", "participant"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: InviteStatus, default: InviteStatus.PENDING })
	@Field(() => InviteStatus)
	status: InviteStatus;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Team, (team) => team.invitations)
	@Field(() => Team)
	team: Team;

	@Column()
	teamId: string;

	@ManyToOne(() => Participant, (participant) => participant.invitations)
	@Field(() => Participant)
	participant: Participant;

	@Column()
	participantId: string;
}

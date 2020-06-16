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
	// STATIC FIELDS

	static primaryKeys = ["id", "status"];

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

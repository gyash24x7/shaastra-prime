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
import { RegistrationType } from "../utils";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Registration")
@ObjectType("Registration")
export class Registration extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "type"];

	static relationalFields = ["team", "event", "participant"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	type: RegistrationType;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Team, (team) => team.registrations, { lazy: true })
	@Field(() => Team, { nullable: true })
	team?: Promise<Team>;

	@Column({ nullable: true })
	teamId?: string;

	@ManyToOne(() => Event, (event) => event.registrations, { lazy: true })
	@Field(() => Event)
	event: Promise<Event>;

	@Column()
	eventId: string;

	@ManyToOne(() => Participant, (participant) => participant.registrations, {
		lazy: true
	})
	@Field(() => Participant, { nullable: true })
	participant?: Promise<Participant>;

	@Column({ nullable: true })
	participantId?: string;
}

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { RegistrationType } from "../utils";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Registration")
@ObjectType("Registration")
export class Registration {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	type: RegistrationType;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Team, (team) => team.registrations)
	@Field(() => Team, { nullable: true })
	team?: Team;

	@Column({ nullable: true })
	teamId?: string;

	@ManyToOne(() => Event, (event) => event.registrations)
	@Field(() => Event)
	event: Event;

	@Column()
	eventId: string;

	@ManyToOne(() => Participant, (participant) => participant.registrations)
	@Field(() => Participant, { nullable: true })
	participant?: Participant;

	@Column({ nullable: true })
	participantId?: string;
}

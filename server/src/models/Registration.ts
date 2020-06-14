import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { RegistrationType } from "../utils";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Registration")
@ObjectType("Registration")
export class Registration extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	type: RegistrationType;

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

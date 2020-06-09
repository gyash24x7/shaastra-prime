import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistrationType } from "../utils";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Registration")
@ObjectType("Registration")
export class Registration {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	type: RegistrationType;

	@ManyToOne(() => Team, (team) => team.registrations)
	@Field(() => Team, { nullable: true })
	team?: Team;

	@ManyToOne(() => Event, (event) => event.registrations)
	@Field(() => Event)
	event: Event;

	@ManyToOne(() => Participant, (participant) => participant.registrations)
	@Field(() => Participant, { nullable: true })
	participant?: Participant;
}

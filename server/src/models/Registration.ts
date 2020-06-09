import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

	@Field(() => Team, { nullable: true }) team?: Team;
	@Field(() => Event) event: Event;
	@Field(() => Participant, { nullable: true }) participant?: Participant;
}

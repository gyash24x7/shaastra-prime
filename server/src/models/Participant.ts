import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Participant")
@ObjectType("Participant")
export class Participant {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@PrimaryGeneratedColumn("increment")
	@Field()
	shaastraID: string;

	@PrimaryColumn()
	@Field()
	shaastraQR: string;

	@Column()
	@Field()
	email: string;

	@Column()
	password: string;

	@Column()
	@Field()
	mobile: string;

	@Column()
	@Field()
	gender: string;

	@Column()
	@Field()
	college: string;

	@Column()
	@Field()
	city: string;

	@Column()
	@Field()
	state: string;

	@Field(() => [Registration]) registrations: Registration[];
	@Field(() => [TeamInvitation]) invitations: TeamInvitation[];
}

import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Participant")
@ObjectType("Participant")
export class Participant extends BaseEntity {
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

	@OneToMany(() => Registration, (registration) => registration.participant)
	@Field(() => [Registration])
	registrations: Registration[];

	@OneToMany(() => TeamInvitation, (invitation) => invitation.participant)
	@Field(() => [TeamInvitation])
	invitations: TeamInvitation[];
}

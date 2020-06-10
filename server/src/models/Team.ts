import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Team")
@ObjectType("Team")
export class Team extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@OneToMany(() => TeamInvitation, (invitation) => invitation.team)
	@Field(() => [TeamInvitation])
	invitations: TeamInvitation[];

	@OneToMany(() => Registration, (registration) => registration.team)
	@Field(() => [Registration])
	registrations: Registration[];
}

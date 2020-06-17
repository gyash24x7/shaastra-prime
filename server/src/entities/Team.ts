import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Team")
@ObjectType("Team")
export class Team {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	// RELATIONS AND FOREIGN KEYS

	@OneToMany(() => TeamInvitation, (invitation) => invitation.team)
	@Field(() => [TeamInvitation])
	invitations: TeamInvitation[];

	@OneToMany(() => Registration, (registration) => registration.team)
	@Field(() => [Registration])
	registrations: Registration[];
}

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

	@OneToMany(() => TeamInvitation, (invitation) => invitation.team, {
		lazy: true
	})
	@Field(() => [TeamInvitation])
	invitations: Promise<TeamInvitation[]>;

	@OneToMany(() => Registration, (registration) => registration.team, {
		lazy: true
	})
	@Field(() => [Registration])
	registrations: Promise<Registration[]>;
}

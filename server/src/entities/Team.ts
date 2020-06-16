import cuid from "cuid";
import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Team")
@ObjectType("Team")
export class Team extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "name"];

	static relationalFields = ["invitations", "registrations"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	// RELATIONS AND FOREIGN KEYS

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

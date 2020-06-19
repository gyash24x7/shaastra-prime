import cuid from "cuid";
import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	Generated,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Registration } from "./Registration";
import { TeamInvitation } from "./TeamInvitation";

@Entity("Participant")
@ObjectType("Participant")
export class Participant extends BaseEntity {
	static primaryFields = [
		"id",
		"name",
		"email",
		"shaastraID",
		"shaastraQR",
		"mobile",
		"gender",
		"college",
		"city",
		"state"
	];

	static relationalFields = ["registrations", "invitations"];

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

	@Generated("increment")
	@Field()
	shaastraID: string;

	@Column({ unique: true })
	@Field()
	shaastraQR: string;

	@Column({ unique: true })
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

	// RELATIONS

	@OneToMany(() => Registration, (registration) => registration.participant)
	@Field(() => [Registration])
	registrations: Registration[];

	@OneToMany(() => TeamInvitation, (invitation) => invitation.participant)
	@Field(() => [TeamInvitation])
	invitations: TeamInvitation[];
}
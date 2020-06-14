import cuid from "cuid";
import jwt from "jsonwebtoken";
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
	// STATIC FIELDS

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
	setIdAndShaastraQR() {
		this.id = cuid();
		this.shaastraQR = jwt.sign({ id: this.id }, process.env.QR_SECRET!);
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

	@OneToMany(() => Registration, (registration) => registration.participant, {
		lazy: true
	})
	@Field(() => [Registration])
	registrations: Promise<Registration[]>;

	@OneToMany(() => TeamInvitation, (invitation) => invitation.participant, {
		lazy: true
	})
	@Field(() => [TeamInvitation])
	invitations: Promise<TeamInvitation[]>;
}

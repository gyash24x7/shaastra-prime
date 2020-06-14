import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	Generated,
	OneToMany,
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

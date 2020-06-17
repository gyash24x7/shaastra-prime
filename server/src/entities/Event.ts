import cuid from "cuid";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn
} from "typeorm";
import { RegistrationType } from "../utils";
import { Media } from "./Media";
import { Registration } from "./Registration";
import { User } from "./User";
import { Vertical } from "./Vertical";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@Entity("Event")
@ObjectType("Event")
export class Event extends BaseEntity {
	static primaryFields = [
		"id",
		"name",
		"rank",
		"info",
		"updatedOn",
		"approved",
		"paid",
		"eventTabs",
		"registrationType"
	];

	static relationalFields = ["updatedBy", "image", "vertical", "registrations"];

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

	@Column("int")
	@Field(() => Int)
	rank: number;

	@Column()
	@Field()
	info: string;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@Column()
	@Field()
	approved: boolean;

	@Column()
	@Field()
	paid: boolean;

	//stringified JSON
	@Column()
	@Field(() => String)
	eventTabs: string;

	@Column("enum", { enum: RegistrationType })
	@Field(() => RegistrationType)
	registrationType: RegistrationType;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => User, (user) => user.eventsUpdated)
	@Field(() => User)
	updatedBy: User;

	@Column()
	updatedById: string;

	@OneToOne(() => Media, { cascade: true, nullable: true })
	@JoinColumn()
	@Field(() => Media, { nullable: true })
	image?: Media;

	@Column({ nullable: true })
	imageId?: string;

	@ManyToOne(() => Vertical, (vertical) => vertical.events, {
		onDelete: "CASCADE"
	})
	@Field(() => Vertical)
	vertical: Vertical;

	@Column()
	verticalId: string;

	@OneToMany(() => Registration, (registration) => registration.event)
	@Field(() => [Registration])
	registrations: Registration[];
}

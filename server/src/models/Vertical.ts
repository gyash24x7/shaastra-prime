import cuid from "cuid";
import { Field, ID, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	Generated,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn
} from "typeorm";
import { Event } from "./Event";
import { Media } from "./Media";
import { User } from "./User";

@Entity("Vertical")
@ObjectType("Vertical")
export class Vertical extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "rank", "info", "updatedOn"];

	static relationalFields = ["image", "events"];

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	@Generated("increment")
	@Field(() => Int)
	rank: number;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	info: string;

	@ManyToOne(() => User, (user) => user.verticalsUpdated, { lazy: true })
	@Field(() => User)
	updatedBy: Promise<User>;

	@Column()
	updatedById: string;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@OneToOne(() => Media, { lazy: true })
	@JoinColumn()
	@Field(() => Media, { nullable: true })
	image: Promise<Media>;

	@OneToMany(() => Event, (event) => event.vertical, { lazy: true })
	events: Promise<Event[]>;
}

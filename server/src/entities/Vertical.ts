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
	static primaryFields = ["id", "rank", "info", "updatedOn"];
	static relationalFields = ["image"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Generated("increment")
	@Field(() => Int)
	rank: number;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	info: string;

	// RELATIONS AND FORIEGN KEYS

	@ManyToOne(() => User, (user) => user.verticalsUpdated)
	@Field(() => User)
	updatedBy: User;

	@Column()
	updatedById: string;

	@OneToOne(() => Media)
	@JoinColumn()
	@Field(() => Media, { nullable: true })
	image: Media;

	@Column({ nullable: true })
	imageId: string;

	@OneToMany(() => Event, (event) => event.vertical)
	events: Event[];
}

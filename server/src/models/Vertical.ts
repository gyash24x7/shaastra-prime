import { Field, ID, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Event } from "./Event";
import { Media } from "./Media";
import { User } from "./User";

@Entity("Vertical")
@ObjectType("Vertical")
export class Vertical extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column("int")
	@Field(() => Int)
	rank: number;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	info: string;

	@ManyToOne(() => User, (user) => user.verticalsUpdated)
	@Field(() => User)
	updatedBy: User;

	@UpdateDateColumn()
	@Field()
	updatedOn: string;

	@OneToOne(() => Media)
	@JoinColumn()
	@Field(() => Media, { nullable: true })
	image: Media;

	@OneToMany(() => Event, (event) => event.vertical)
	events: Event[];
}

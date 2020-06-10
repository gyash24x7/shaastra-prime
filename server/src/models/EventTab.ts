import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Event } from "./Event";

@Entity("EventTab")
@ObjectType("EventTab")
export class EventTab extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	content: string;

	@ManyToOne(() => Event, (event) => event.eventTabs)
	event: Event;
}

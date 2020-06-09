import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";

@Entity("EventTab")
@ObjectType("EventTab")
export class EventTab {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	content: string;

	@Field(() => Event) event: Event;
	@Field(() => User) updatedBy: User;
}

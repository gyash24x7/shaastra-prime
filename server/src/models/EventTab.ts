import { Field, ID, ObjectType } from "type-graphql";
import { Event } from "./Event";
import { User } from "./User";

@ObjectType("EventTab")
export class EventTab {
	@Field(() => ID) id: string;
	@Field() title: string;
	@Field() content: string;
	@Field(() => Event) event: Event;
	@Field(() => User) updatedBy: User;
}

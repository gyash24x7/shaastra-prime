import { Field, ID, ObjectType } from "type-graphql";

import { Media } from "./Media";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

@ObjectType()
export class Channel {
	@Field(() => ID) id: number;
	@Field() name: string;
	@Field() description: string;
	@Field() createdAt: string;
	@Field() archived: boolean;
	@Field(() => [Message]) messages: Message[];
	@Field(() => User) createdBy: User;
	@Field(() => [User]) members: User[];
	@Field(() => [Media]) media: Media[];
	@Field(() => Task) task?: Task;
}

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { ChannelType } from "./../utils/index";
import { Message } from "./Message";
import { Task } from "./Task";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@ObjectType()
export class Channel {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() description: string;
	@Field() createdAt: string;
	@Field() archived: boolean;
	@Field(() => ChannelType) type: ChannelType;
	@Field(() => [Message]) messages: Message[];
	@Field(() => User) createdBy: User;
	@Field(() => [User]) members: User[];
	@Field(() => [Task]) tasks: Task[];
	@Field(() => [TaskActivity]) taskActivity: TaskActivity[];
}

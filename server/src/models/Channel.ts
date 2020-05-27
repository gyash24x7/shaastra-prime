import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { ChannelType } from "./../utils/index";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@ObjectType("Channel")
export class Channel {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() description: string;
	@Field() createdAt: string;
	@Field() archived: boolean;
	@Field(() => ChannelType) type: ChannelType;
	@Field(() => [User]) members: User[];
	@Field(() => User) createdBy: User;
	@Field(() => [Task]) connectedTasks: Task[];
	@Field(() => [Message]) starredMsgs: Message[];
}

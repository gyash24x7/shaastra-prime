import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { MessageStatus } from "../utils";
import { Channel } from "./Channel";
import { Reaction } from "./Reaction";
import { User } from "./User";

registerEnumType(MessageStatus, { name: "MessageStatus" });

@ObjectType()
export class Message {
	@Field(() => ID) id: string;
	@Field() content: string;
	@Field() createdAt: string;
	@Field(() => User) createdBy: User;
	@Field(() => Channel) channel: Channel;
	@Field() starred: boolean;
	@Field(() => [Reaction]) reactions: Reaction[];
}

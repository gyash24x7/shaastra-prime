import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { MessageType } from "./../utils/index";
import { Channel } from "./Channel";
import { Media } from "./Media";
import { Reaction } from "./Reaction";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@ObjectType()
export class Message {
	@Field(() => ID) id: string;
	@Field() content: string;
	@Field() createdAt: string;
	@Field(() => User) createdBy: User;
	@Field(() => Channel) channel: Channel;
	@Field() starred: boolean;
	@Field(() => [Reaction]) reactions: Reaction[];
	@Field(() => [Media]) media: Media[];
	@Field(() => MessageType) type: MessageType;
}

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { MessageType } from "./../utils/index";
import { Media } from "./Media";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@ObjectType()
export class Message {
	@Field(() => ID) id: string;
	@Field() content: string;
	@Field() createdAt: string;
	@Field(() => User) createdBy: User;
	@Field() starred: boolean;
	@Field() likes: number;
	@Field(() => [Media]) media: Media[];
	@Field(() => MessageType) type: MessageType;
}

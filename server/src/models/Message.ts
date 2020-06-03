import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { MessageType } from "./../utils/index";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { TaskActivity } from "./TaskActivity";
import { User } from "./User";

registerEnumType(MessageType, { name: "MessageType" });

@ObjectType("Message")
export class Message {
	@Field(() => ID) id: string;
	@Field() content: string;
	@Field() createdAt: string;
	@Field(() => User) createdBy: User;
	@Field() starred: boolean;
	@Field(() => Int) likes: number;
	@Field(() => [Media]) media: Media[];
	@Field(() => MessageType) type: MessageType;
	@Field() liked: boolean;
	@Field(() => TaskActivity, { nullable: true }) taskActivity?: TaskActivity;
	@Field(() => InvoiceActivity, { nullable: true })
	invoiceActivity?: InvoiceActivity;
}

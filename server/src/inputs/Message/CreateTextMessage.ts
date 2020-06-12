import { Field, InputType } from "type-graphql";

@InputType("CreateTextMessageInput")
export class CreateTextMessageInput {
	@Field() channelId: string;
	@Field() content: string;
}

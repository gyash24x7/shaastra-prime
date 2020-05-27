import { Field, InputType } from "type-graphql";

@InputType("CreateMessageInput")
export class CreateMessageInput {
	@Field() channelId: string;
	@Field() content: string;
	@Field(() => [String]) media: string[];
	@Field(() => String, { nullable: true }) mediaType?: string;
}

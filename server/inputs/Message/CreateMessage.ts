import { Field, InputType } from "type-graphql";

@InputType()
export class CreateMessageInput {
	@Field() channelId: string;
	@Field() content: string;
	@Field(() => [String]) media: string[];
	@Field(() => String, { nullable: true }) mediaType?: string;
}

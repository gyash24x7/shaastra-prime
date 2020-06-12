import { Field, InputType } from "type-graphql";

@InputType("CreateMediaMessageInput")
export class CreateMediaMessageInput {
	@Field() channelId: string;
	@Field(() => [String]) mediaUrls: string[];
}

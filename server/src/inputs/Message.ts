import { Field, InputType, Int } from "type-graphql";

@InputType("CreateMediaMessageInput")
export class CreateMediaMessageInput {
	@Field() channelId: string;
	@Field(() => [String]) mediaUrls: string[];
}

@InputType("CreateTextMessageInput")
export class CreateTextMessageInput {
	@Field() channelId: string;
	@Field() content: string;
}

@InputType("GetMessagesInput")
export class GetMessagesInput {
	@Field() channelId: string;
	@Field(() => Int, { nullable: true }) skip?: number;
	@Field(() => Int, { nullable: true }) first?: number;
}

import { Field, InputType, Int } from "type-graphql";

@InputType("GetMessagesInput")
export class GetMessagesInput {
	@Field() channelId: string;
	@Field(() => Int, { nullable: true }) skip?: number;
	@Field(() => Int, { nullable: true }) first?: number;
}

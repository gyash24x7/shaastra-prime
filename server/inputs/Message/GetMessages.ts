import { Field, InputType } from "type-graphql";

@InputType()
export class GetMessagesInput {
	@Field() channelId: string;
	@Field() skip: number;
	@Field() first: number;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class AddUserToChannelInput {
	@Field() channelId: string;
	@Field() userId: string;
}

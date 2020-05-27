import { Field, InputType } from "type-graphql";

@InputType("AddUsersToChannelInput")
export class AddUsersToChannelInput {
	@Field() channelId: string;
	@Field(() => [String]) userIds: string[];
}

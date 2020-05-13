import { Field, InputType } from "type-graphql";

@InputType()
export class AddUsersToChannelInput {
	@Field() channelId: string;
	@Field(() => [String]) userIds: string[];
}

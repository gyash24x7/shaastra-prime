import { Field, InputType } from "type-graphql";

@InputType("UpdateChannelDescriptionInput")
export class UpdateChannelDescriptionInput {
	@Field() channelId: string;
	@Field() description: string;
}

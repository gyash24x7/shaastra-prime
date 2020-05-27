import { Field, InputType } from "type-graphql";

@InputType("UpdateChannelInput")
export class UpdateChannelInput {
	@Field() channelId: string;
	@Field() archived?: boolean;
	@Field() description?: string;
}

import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateChannelInput {
	@Field() channelId: string;
	@Field() archived?: boolean;
	@Field() description?: string;
}

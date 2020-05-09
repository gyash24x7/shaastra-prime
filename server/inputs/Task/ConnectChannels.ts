import { Field, InputType } from "type-graphql";

@InputType()
export class ConnectChannelsInput {
	@Field() taskId: string;
	@Field(() => [String]) channelIds: string[];
}

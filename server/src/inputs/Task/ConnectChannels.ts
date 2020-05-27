import { Field, InputType } from "type-graphql";

@InputType("ConnectChannelsToTaskInput")
export class ConnectChannelsToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) channelIds: string[];
}

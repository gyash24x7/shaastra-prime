import { Field, InputType } from "type-graphql";

@InputType()
export class ConnectChannelsToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) channelIds: string[];
}

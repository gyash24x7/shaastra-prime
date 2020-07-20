import { Field, InputType } from "@nestjs/graphql";

@InputType("AddUsersToChannelInput")
export class AddUsersToChannelInput {
	@Field() channelId: string;
	@Field(() => [String]) userIds: string[];
}

@InputType("CreateChannelInput")
export class CreateChannelInput {
	@Field() name: string;
	@Field() description: string;
	@Field(() => [String]) memberIds: string[];
}

@InputType("UpdateChannelDescriptionInput")
export class UpdateChannelDescriptionInput {
	@Field() channelId: string;
	@Field() description: string;
}

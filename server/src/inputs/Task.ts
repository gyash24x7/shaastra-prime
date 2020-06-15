import { Field, InputType } from "type-graphql";

@InputType("AssignTaskInput")
export class AssignTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) assignedTo: string[];
}

@InputType("AttachMediaToTaskInput")
export class AttachMediaToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) urls: string[];
}

@InputType("CreateTaskInput")
export class CreateTaskInput {
	@Field() brief: string;
	@Field() details: string;
	@Field() forDeptId: string;
	@Field() deadline: string;
	@Field(() => [String]) channelIds: string[];
}

@InputType("ConnectChannelsToTaskInput")
export class ConnectChannelsToTaskInput {
	@Field() taskId: string;
	@Field(() => [String]) channelIds: string[];
}

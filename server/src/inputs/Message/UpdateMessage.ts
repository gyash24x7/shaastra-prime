import { Field, InputType } from "type-graphql";

@InputType("UpdateMessageInput")
export class UpdateMessageInput {
	@Field() messageId: string;
	@Field() starred?: boolean;
	@Field() like?: boolean;
}

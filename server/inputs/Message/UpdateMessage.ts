import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateMessageInput {
	@Field() messageId: string;
	@Field() starred?: boolean;
	@Field() like?: boolean;
}

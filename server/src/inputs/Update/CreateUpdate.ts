import { Field, InputType } from "type-graphql";

@InputType("CreateUpdateInput")
export class CreateUpdateInput {
	@Field() brief: string;
	@Field() subject: string;
	@Field() content: string;
}

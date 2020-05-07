import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUpdateInput {
	@Field() brief: string;
	@Field() subject: string;
	@Field() content: string;
}

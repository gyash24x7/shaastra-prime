import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVerticalInput {
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageUrl?: string;
}

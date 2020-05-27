import { Field, InputType } from "type-graphql";

@InputType("CreateVerticalInput")
export class CreateVerticalInput {
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageUrl?: string;
}

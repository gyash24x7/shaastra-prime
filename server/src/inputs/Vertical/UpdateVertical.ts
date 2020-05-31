import { Field, ID, InputType } from "type-graphql";

@InputType("UpdateVerticalInput")
export class UpdateVerticalInput {
	@Field(() => ID) verticalId: string;
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageId: string;
}
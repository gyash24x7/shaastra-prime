import { Field, ID, InputType } from "type-graphql";

@InputType("CreateVerticalInput")
export class CreateVerticalInput {
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageUrl?: string;
}

@InputType("UpdateVerticalInput")
export class UpdateVerticalInput {
	@Field(() => ID) verticalId: string;
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageId: string;
}

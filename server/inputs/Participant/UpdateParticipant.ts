import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateParticipantInput {
	@Field()
	name: string;

	@Field()
	@Length(10, 10)
	mobile: string;

	@Field()
	gender: string;

	@Field()
	college: string;

	@Field()
	city: string;

	@Field()
	state: string;
}

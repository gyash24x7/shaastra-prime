import { Field, InputType } from "type-graphql";
import { RegistrationType } from "../../utils";

@InputType("CreateRegistrationInput")
export class CreateRegistrationInput {
	@Field(() => RegistrationType) type: RegistrationType;
	@Field() eventID: string;
	@Field() pId?: string;
	@Field() teamId?: string;
}

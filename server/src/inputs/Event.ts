import { Field, ID, InputType, registerEnumType } from "type-graphql";
import { RegistrationType } from "../utils";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@InputType("CreateEventInput")
export class CreateEventInput {
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageUrl?: string;
	@Field() paid: boolean;
	@Field(() => ID) verticalId: string;
	@Field(() => RegistrationType) registrationType: RegistrationType;
	@Field(() => [String]) eventTabTitles: string[];
	@Field(() => [String]) eventTabContents: string[];
}

registerEnumType(RegistrationType, { name: "RegistrationType" });

@InputType("UpdateEventInput")
export class UpdateEventInput {
	@Field() id: string;
	@Field() name: string;
	@Field() info: string;
	@Field({ nullable: true }) imageUrl?: string;
	@Field() paid: boolean;
	@Field(() => RegistrationType) registrationType: RegistrationType;
	@Field(() => [String]) eventTabTitles: string[];
	@Field(() => [String]) eventTabContents: string[];
}
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { RegistrationType } from "../utils";
import { EventTab } from "./EventTab";
import { Media } from "./Media";
import { Registration } from "./Registration";
import { User } from "./User";
import { Vertical } from "./Vertical";

registerEnumType(RegistrationType, { name: "RegistrationType" });
@ObjectType()
export class Event {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field(() => Int) rank: number;
	@Field() info: string;
	@Field() updatedOn: string;
	@Field() approved: boolean;
	@Field() paid: boolean;
	@Field(() => User) updatedBy: User;
	@Field(() => Media, { nullable: true }) image: Media;
	@Field(() => Vertical) vertical: Vertical;
	@Field(() => [EventTab]) eventTabs: EventTab[];
	@Field(() => RegistrationType) registrationType: RegistrationType;
	@Field(() => [Registration]) registrations: Registration[];
}

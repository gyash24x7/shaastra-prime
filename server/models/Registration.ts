import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { RegistrationType } from "../utils";
import { Event } from "./Event";
import { Participant } from "./Participant";
import { Team } from "./Team";

registerEnumType(RegistrationType, { name: "RegistrationType" });

@ObjectType()
export class Registration {
	@Field(() => ID) id: string;
	@Field(() => RegistrationType) type: RegistrationType;
	@Field(() => Team, { nullable: true }) team?: Team;
	@Field(() => Event) event: Event;
	@Field(() => Participant, { nullable: true }) participant?: Participant;
}

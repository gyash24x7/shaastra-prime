import { Field, InputType } from "type-graphql";
import { GoalType } from "./../../utils";

@InputType("CreateGoalInput")
export class CreateGoalInput {
	@Field() title: string;
	@Field() description: string;
	@Field(() => GoalType) type: GoalType;
	@Field(() => [String]) milestoneTitles: string[];
}

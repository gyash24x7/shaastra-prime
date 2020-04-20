import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { GoalType } from "../utils";
import { Department } from "./Department";
import { Milestone } from "./Milestone";

registerEnumType(GoalType, { name: "GoalType" });

@ObjectType()
export class Goal {
	@Field(() => ID) id: number;
	@Field() title: string;
	@Field(() => Department) dept: Department;
	@Field(() => GoalType) type: GoalType;
	@Field() createdAt: string;
	@Field(() => [Milestone]) milestones: Milestone[];
}

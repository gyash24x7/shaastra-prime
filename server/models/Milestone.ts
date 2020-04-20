import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@ObjectType()
export class Milestone {
	@Field(() => ID) id: number;
	@Field() title: string;
	@Field(() => MilestoneStatus) status: MilestoneStatus;
	@Field(() => Goal) goal: Goal;
}

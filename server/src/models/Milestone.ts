import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@ObjectType("Milestone")
export class Milestone {
	@Field(() => ID) id: string;
	@Field() title: string;
	@Field(() => MilestoneStatus) status: MilestoneStatus;
	@Field(() => Goal) goal: Goal;
}

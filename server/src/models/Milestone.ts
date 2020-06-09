import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@Entity("Milestone")
@ObjectType("Milestone")
export class Milestone {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column("enum", {
		enum: MilestoneStatus,
		default: MilestoneStatus.IN_PROGRESS
	})
	@Field(() => MilestoneStatus)
	status: MilestoneStatus;

	@ManyToOne(() => Goal, (goal) => goal.milestones)
	@Field(() => Goal)
	goal: Goal;
}

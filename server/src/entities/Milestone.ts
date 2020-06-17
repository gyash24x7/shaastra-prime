import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@Entity("Milestone")
@ObjectType("Milestone")
export class Milestone {
	// PRIMARY FIELDS

	@PrimaryColumn()
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

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Goal, (goal) => goal.milestones, { onDelete: "CASCADE" })
	@Field(() => Goal)
	goal: Goal;

	@Column()
	goalId: string;
}

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@Entity("Milestone")
@ObjectType("Milestone")
export class Milestone extends BaseEntity {
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

	@ManyToOne(() => Goal, (goal) => goal.milestones, { lazy: true })
	@Field(() => Goal)
	goal: Promise<Goal>;

	@Column()
	goalId: string;
}

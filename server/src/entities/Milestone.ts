import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { MilestoneStatus } from "../utils";
import { Goal } from "./Goal";

registerEnumType(MilestoneStatus, { name: "MilestoneStatus" });

@Entity("Milestone")
@ObjectType("Milestone")
export class Milestone extends BaseEntity {
	static primaryFields = ["id", "title", "status"];
	static relationalFields = ["goal"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

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

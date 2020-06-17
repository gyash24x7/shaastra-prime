import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { GoalType } from "../utils";
import { Department } from "./Department";
import { Milestone } from "./Milestone";

registerEnumType(GoalType, { name: "GoalType" });

@Entity("Goal")
@ObjectType("Goal")
export class Goal {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	description: string;

	@Column("enum", { enum: GoalType })
	@Field(() => GoalType)
	type: GoalType;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Department, (dept) => dept.goals, { onDelete: "CASCADE" })
	@Field(() => Department)
	dept: Department;

	@Column()
	deptId: string;

	@OneToMany(() => Milestone, (milestone) => milestone.goal, { cascade: true })
	@Field(() => [Milestone])
	milestones: Milestone[];
}

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { GoalType } from "../utils";
import { Department } from "./Department";
import { Milestone } from "./Milestone";

registerEnumType(GoalType, { name: "GoalType" });

@Entity("Goal")
@ObjectType("Goal")
export class Goal extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	description: string;

	@ManyToOne(() => Department, (dept) => dept.goals)
	@Field(() => Department)
	dept: Department;

	@Column("enum", { enum: GoalType })
	@Field(() => GoalType)
	type: GoalType;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@OneToMany(() => Milestone, (milestone) => milestone.goal)
	@Field(() => [Milestone])
	milestones: Milestone[];
}

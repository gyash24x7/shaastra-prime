import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";
import { GoalType } from "../utils";
import { Department } from "./Department";
import { Milestone } from "./Milestone";

registerEnumType(GoalType, { name: "GoalType" });

@Entity("Goal")
@ObjectType("Goal")
export class Goal {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	title: string;

	@Column()
	@Field()
	description: string;

	@Field(() => Department) dept: Department;

	@Column("enum", { enum: GoalType })
	@Field(() => GoalType)
	type: GoalType;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Field(() => [Milestone]) milestones: Milestone[];
}

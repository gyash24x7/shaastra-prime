import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
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
export class Goal extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "title", "description", "type", "createdOn"];

	static relationalFields = ["milestones", "dept"];

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

	@ManyToOne(() => Department, (dept) => dept.goals, { lazy: true })
	@Field(() => Department)
	dept: Promise<Department>;

	@Column()
	deptId: string;

	@OneToMany(() => Milestone, (milestone) => milestone.goal, { cascade: true })
	@Field(() => [Milestone])
	milestones: Milestone[];
}

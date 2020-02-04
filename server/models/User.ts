import {
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	Entity,
	PrimaryColumn,
	ManyToOne
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Department } from "./Department";
import { Lazy } from "../utils";

@Entity()
@ObjectType()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id: string;

	@Field(() => String)
	@Column()
	name: string;

	@Field(() => String)
	@PrimaryColumn()
	email: string;

	@Field(() => String)
	@Column()
	password: string;

	@Field(() => String)
	@PrimaryColumn()
	mobile: string;

	@Field(() => String)
	@PrimaryColumn()
	rollNumber: string;

	@Field(() => String)
	@Column({ default: "" })
	profilePic: string;

	@Field(() => String)
	@Column({ default: "" })
	coverPic: string;

	@Field(() => Department)
	@ManyToOne(
		() => Department,
		department => department.members,
		{ lazy: true }
	)
	department: Lazy<Department>;
}

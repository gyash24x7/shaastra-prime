import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Department } from "./Department";
import { User } from "./User";

@Entity("Update")
@ObjectType("Update")
export class Update {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	brief: string;

	@Column()
	@Field()
	subject: string;

	@Column()
	@Field()
	content: string;

	@ManyToOne(() => Department, (dept) => dept.updates)
	@Field(() => Department)
	byDept: Department;

	@ManyToOne(() => User, (user) => user.updates)
	@Field(() => User)
	postedBy: User;

	@CreateDateColumn()
	@Field()
	createdOn: string;
}

import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
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

	@Field(() => Department) byDept: Department;
	@Field(() => User) postedBy: User;

	@CreateDateColumn()
	@Field()
	createdOn: string;
}

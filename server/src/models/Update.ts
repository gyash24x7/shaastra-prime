import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
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
export class Update extends BaseEntity {
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

	@ManyToOne(() => Department, (dept) => dept.updates, { lazy: true })
	@Field(() => Department)
	byDept: Promise<Department>;

	@ManyToOne(() => User, (user) => user.updates, { lazy: true })
	@Field(() => User)
	postedBy: Promise<User>;

	@CreateDateColumn()
	@Field()
	createdOn: string;
}

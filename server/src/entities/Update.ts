import cuid from "cuid";
import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { Department } from "./Department";
import { User } from "./User";

@Entity("Update")
@ObjectType("Update")
export class Update extends BaseEntity {
	static primaryFields = ["id", "brief", "subject", "content", "createdOn"];
	static relationalFields = ["byDept", "postedBy"];

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
	brief: string;

	@Column()
	@Field()
	subject: string;

	@Column()
	@Field()
	content: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Department, (dept) => dept.updates)
	@Field(() => Department)
	byDept: Department;

	@Column()
	byDeptId: string;

	@ManyToOne(() => User, (user) => user.updates, { onDelete: "CASCADE" })
	@Field(() => User)
	postedBy: User;

	@Column()
	postedById: string;
}
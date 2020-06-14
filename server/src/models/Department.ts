import cuid from "cuid";
import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Goal } from "./Goal";
import { Invoice } from "./Invoice";
import { Task } from "./Task";
import { Update } from "./Update";
import { User } from "./User";

@Entity("Department")
@ObjectType("Department")
export class Department extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "name", "shortName", "subDepartments"];

	static relationalFields = [
		"members",
		"tasksAssigned",
		"tasksCreated",
		"goals",
		"finManager",
		"updates",
		"invoicesSubmitted"
	];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column({ unique: true })
	@Field()
	name: string;

	@Column({ default: "" })
	@Field()
	shortName: string;

	@Column("simple-array", { default: [] })
	@Field(() => [String])
	subDepartments: string[];

	// RELATIONS

	@OneToMany(() => User, (member) => member.department, { lazy: true })
	@Field(() => [User])
	members: Promise<User[]>;

	@OneToMany(() => Task, (task) => task.forDept, { lazy: true })
	@Field(() => [Task])
	tasksAssigned: Promise<Task[]>;

	@OneToMany(() => Task, (task) => task.byDept, { lazy: true })
	@Field(() => [Task])
	tasksCreated: Promise<Task[]>;

	@OneToMany(() => Goal, (goal) => goal.dept, { lazy: true })
	@Field(() => [Goal])
	goals: Promise<Goal[]>;

	@ManyToOne(() => User, (user) => user.finManagerForDepts, { lazy: true })
	@Field(() => User, { nullable: true })
	finManager?: Promise<User>;

	@Column({ nullable: true })
	finManagerId?: string;

	@OneToMany(() => Invoice, (invoice) => invoice.byDept, { lazy: true })
	invoicesSubmitted: Promise<Invoice[]>;

	@OneToMany(() => Update, (update) => update.byDept, { lazy: true })
	updates: Promise<Update[]>;
}

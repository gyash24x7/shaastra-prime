import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from "typeorm";
import { Goal } from "./Goal";
import { Invoice } from "./Invoice";
import { Task } from "./Task";
import { Update } from "./Update";
import { User } from "./User";

@Entity("Department")
@ObjectType("Department")
export class Department extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@PrimaryColumn()
	@Field()
	name: string;

	@Column()
	@Field()
	shortName: string;

	@OneToMany(() => User, (member) => member.department, { lazy: true })
	@Field(() => [User])
	members: Promise<User[]>;

	@OneToMany(() => Task, (task) => task.forDept, { lazy: true })
	@Field(() => [Task])
	tasksAssigned: Promise<Task[]>;

	@OneToMany(() => Task, (task) => task.byDept, { lazy: true })
	@Field(() => [Task])
	tasksCreated: Promise<Task[]>;

	@Column("simple-array")
	@Field(() => [String])
	subDepartments: string[];

	@OneToMany(() => Goal, (goal) => goal.dept, { lazy: true })
	@Field(() => [Goal])
	goals: Promise<Goal[]>;

	@ManyToOne(() => User, (user) => user.finManagerForDepts, { lazy: true })
	@Field(() => User, { nullable: true })
	finManager?: Promise<User>;

	@OneToMany(() => Invoice, (invoice) => invoice.byDept, { lazy: true })
	invoicesSubmitted: Promise<Invoice[]>;

	@ManyToOne(() => Update, (update) => update.byDept, { lazy: true })
	updates: Promise<Update[]>;
}

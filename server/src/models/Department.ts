import { Field, ID, ObjectType } from "type-graphql";
import {
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
export class Department {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@PrimaryColumn()
	@Field()
	name: string;

	@Column()
	@Field()
	shortName: string;

	@OneToMany(() => User, (member) => member.department)
	@Field(() => [User])
	members: User[];

	@OneToMany(() => Task, (task) => task.forDept)
	@Field(() => [Task])
	tasksAssigned: Task[];

	@OneToMany(() => Task, (task) => task.byDept)
	@Field(() => [Task])
	tasksCreated: Task[];

	@Column("simple-array")
	@Field(() => [String])
	subDepartments: string[];

	@OneToMany(() => Goal, (goal) => goal.dept)
	@Field(() => [Goal])
	goals: Goal[];

	@ManyToOne(() => User, (user) => user.finManagerForDepts)
	@Field(() => User, { nullable: true })
	finManager?: User;

	@OneToMany(() => Invoice, (invoice) => invoice.byDept)
	invoicesSubmitted: Invoice[];

	@ManyToOne(() => Update, (update) => update.byDept)
	updates: Update[];
}

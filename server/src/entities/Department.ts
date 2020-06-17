import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Goal } from "./Goal";
import { Invoice } from "./Invoice";
import { Task } from "./Task";
import { Update } from "./Update";
import { User } from "./User";

@Entity("Department")
@ObjectType("Department")
export class Department {
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

	@Column("simple-array")
	@Field(() => [String])
	subDepartments: string[];

	// RELATIONS

	@OneToMany(() => User, (member) => member.department)
	@Field(() => [User])
	members: User[];

	@OneToMany(() => Task, (task) => task.forDept)
	@Field(() => [Task])
	tasksAssigned: Task[];

	@OneToMany(() => Task, (task) => task.byDept)
	@Field(() => [Task])
	tasksCreated: Task[];

	@OneToMany(() => Goal, (goal) => goal.dept)
	@Field(() => [Goal])
	goals: Goal[];

	@ManyToOne(() => User, (user) => user.finManagerForDepts)
	@Field(() => User, { nullable: true })
	finManager?: User;

	@Column({ nullable: true })
	finManagerId?: string;

	@OneToMany(() => Invoice, (invoice) => invoice.byDept)
	invoicesSubmitted: Invoice[];

	@OneToMany(() => Update, (update) => update.byDept)
	updates: Update[];
}

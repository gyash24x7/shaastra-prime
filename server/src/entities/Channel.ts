import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { ChannelType } from "../utils/index";
import { Invoice } from "./Invoice";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@Entity("Channel")
@ObjectType("Channel")
export class Channel extends BaseEntity {
	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@Column()
	@Field()
	description: string;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column()
	@Field()
	archived: boolean;

	@Column("enum", { enum: ChannelType })
	@Field(() => ChannelType)
	type: ChannelType;

	// RELATIONS

	@ManyToMany(() => User, (user) => user.channels)
	@JoinTable()
	@Field(() => [User])
	members: User[];

	@ManyToOne(() => User, (user) => user.channelsCreated)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;

	@ManyToMany(() => Task, (task) => task.channels)
	@Field(() => [Task])
	connectedTasks: Task[];

	@ManyToMany(() => Invoice, (invoice) => invoice.channels)
	@Field(() => [Invoice])
	connectedInvoices: Invoice[];

	@ManyToMany(() => Message, (message) => message.channels)
	@JoinTable()
	messages: Message[];
}

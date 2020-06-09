import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { ChannelType } from "./../utils/index";
import { Invoice } from "./Invoice";
import { Message } from "./Message";
import { Task } from "./Task";
import { User } from "./User";

registerEnumType(ChannelType, { name: "ChannelType" });

@Entity("Channel")
@ObjectType("Channel")
export class Channel {
	@PrimaryGeneratedColumn("uuid")
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

	@ManyToMany(() => User)
	@JoinTable()
	@Field(() => [User])
	members: User[];

	@ManyToOne(() => User)
	@Field(() => User)
	createdBy: User;

	@ManyToMany(() => Task, (task) => task.channels)
	@Field(() => [Task])
	connectedTasks: Task[];

	@ManyToMany(() => Invoice, (invoice) => invoice.channels)
	@JoinTable()
	@Field(() => [Invoice])
	connectedInvoices: Invoice[];

	//computed
	@Field(() => [Message]) starredMsgs: Message[];

	@OneToMany(() => Message, (message) => message.channel, {
		onDelete: "CASCADE"
	})
	messages: Message[];
}

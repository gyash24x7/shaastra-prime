import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
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
export class Channel extends BaseEntity {
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

	@ManyToMany(() => User, (user) => user.channels, { lazy: true })
	@JoinTable()
	@Field(() => [User])
	members: Promise<User[]>;

	@ManyToOne(() => User, (user) => user.channelsCreated, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@ManyToMany(() => Task, (task) => task.channels, { lazy: true })
	@Field(() => [Task])
	connectedTasks: Promise<Task[]>;

	@ManyToMany(() => Invoice, (invoice) => invoice.channels, { lazy: true })
	@JoinTable()
	@Field(() => [Invoice])
	connectedInvoices: Promise<Invoice[]>;

	//computed
	@Field(() => [Message]) starredMsgs: Message[];

	@OneToMany(() => Message, (message) => message.channel, {
		onDelete: "CASCADE",
		lazy: true
	})
	messages: Promise<Message[]>;
}

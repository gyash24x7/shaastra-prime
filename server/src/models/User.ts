import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from "typeorm";
import { UserRole } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { Event } from "./Event";
import { Invoice } from "./Invoice";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { Message } from "./Message";
import { Task } from "./Task";
import { TaskActivity } from "./TaskActivity";
import { Update } from "./Update";
import { Vertical } from "./Vertical";

registerEnumType(UserRole, { name: "UserRole" });

@Entity("User")
@ObjectType("User")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@PrimaryColumn()
	@Field()
	email: string;

	@Column()
	@Field()
	rollNumber: string;

	@Column()
	@Field()
	profilePic: string;

	@Column()
	@Field()
	coverPic: string;

	@Column()
	@Field()
	mobile: string;

	@Column()
	@Field()
	upi: string;

	@Column()
	@Field()
	about: string;

	@Column("enum", { enum: UserRole, default: UserRole.COORD })
	@Field(() => UserRole)
	role: UserRole;

	@Column()
	@Field()
	verified: boolean;

	@Column()
	password: string;

	@Column()
	verificationOTP: string;

	@Column()
	passwordOTP: string;

	@ManyToOne(() => Department, (dept) => dept.members, { lazy: true })
	@Field(() => Department)
	department: Promise<Department>;

	@ManyToMany(() => Channel, (channel) => channel.members, { lazy: true })
	channels: Promise<Channel[]>;

	@OneToMany(() => Media, (media) => media.uploadedBy, { lazy: true })
	media: Promise<Media[]>;

	@OneToMany(() => Task, (task) => task.createdBy, { lazy: true })
	tasksAssigned: Promise<Task[]>;

	@OneToMany(() => Invoice, (invoice) => invoice.uploadedBy, { lazy: true })
	invoicesSubmitted: Promise<Invoice[]>;

	@ManyToOne(() => Message, (msg) => msg.createdBy, { lazy: true })
	messages: Promise<Message[]>;

	@OneToMany(() => Channel, (channel) => channel.createdBy, { lazy: true })
	channelsCreated: Promise<Channel[]>;

	@OneToMany(() => Task, (task) => task.createdBy, { lazy: true })
	tasksCreated: Promise<Task[]>;

	@ManyToMany(() => Message, (message) => message.likedBy, { lazy: true })
	likedMessages: Promise<Message[]>;

	@OneToMany(() => Update, (update) => update.postedBy, { lazy: true })
	updates: Promise<Update[]>;

	@OneToMany(() => Vertical, (vertical) => vertical.updatedBy, { lazy: true })
	verticalsUpdated: Promise<Vertical[]>;

	@OneToMany(() => Event, (event) => event.updatedBy, { lazy: true })
	eventsUpdated: Promise<Event[]>;

	@OneToMany(() => TaskActivity, (activity) => activity.createdBy, {
		lazy: true
	})
	taskActivity: Promise<TaskActivity[]>;

	@OneToMany(() => InvoiceActivity, (activity) => activity.createdBy, {
		lazy: true
	})
	invoiceActivity: Promise<InvoiceActivity[]>;

	@OneToMany(() => Department, (dept) => dept.finManager, { lazy: true })
	finManagerForDepts: Promise<Department[]>;
}

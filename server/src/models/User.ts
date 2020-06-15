import bcrypt from "bcryptjs";
import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	AfterInsert,
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { UserRole } from "../utils";
import mailjet from "../utils/mailjet";
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
	// CUSTOM STATIC PROPERTIES AND METHODS

	static primaryFields = [
		"id",
		"name",
		"email",
		"rollNumber",
		"profilePic",
		"coverPic",
		"upi",
		"mobile",
		"about",
		"verified",
		"role"
	];

	static relationalFields = ["department"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 13);
	}

	@BeforeInsert()
	async generateVerificationOTP() {
		this.verificationOTP = Math.floor(
			100000 + Math.random() * 900000
		).toString();
	}

	@AfterInsert()
	async sendVerificationMail() {
		if (process.env.NODE_ENV === "production") {
			await mailjet
				.post("send", { version: "v3" })
				.request({
					FromEmail: "prime@shaastra.org",
					FromName: "Shaastra Prime Bot",
					Recipients: [
						{
							Email: `${this.rollNumber.toLowerCase()}@smail.iitm.ac.in`,
							Name: this.name
						}
					],
					Subject: "Complete Smail Verification | Shaastra Prime",
					"Html-part": `<p>You verification code is <strong>${this.verificationOTP}</strong></p>`
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field()
	name: string;

	@Column({ unique: true })
	@Field()
	email: string;

	@Column()
	@Field()
	rollNumber: string;

	@Column({ default: "" })
	@Field()
	profilePic: string;

	@Column({ default: "" })
	@Field()
	coverPic: string;

	@Column()
	@Field()
	mobile: string;

	@Column({ default: "" })
	@Field()
	upi: string;

	@Column({ default: "" })
	@Field()
	about: string;

	@Column("enum", { enum: UserRole, default: UserRole.COORD })
	@Field(() => UserRole)
	role: UserRole;

	@Column({ default: false })
	@Field()
	verified: boolean;

	@Column()
	password: string;

	@Column()
	verificationOTP: string;

	@Column({ nullable: true })
	passwordOTP: string;

	// RELATIONS & FOREIGN KEYS

	@ManyToOne(() => Department, (dept) => dept.members, { lazy: true })
	@Field(() => Department)
	department: Promise<Department>;

	@Column()
	departmentId: string;

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

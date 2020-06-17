import bcrypt from "bcryptjs";
import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	AfterInsert,
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { SendMailOptions, UserRole } from "../utils";
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
	async setId() {
		this.id = cuid();
		this.password = await bcrypt.hash(this.password, 13);
		this.verificationOTP = User.generateOTP();
	}

	@AfterInsert()
	async senVerificationMail() {
		await User.sendMail({
			rollNumber: this.rollNumber,
			name: this.name,
			subject: "Complete Smail Verification | Shaastra Prime",
			htmlPart: `<p>You verification code is <strong>${this.verificationOTP}</strong></p>`
		});
	}

	static findByEmail(email: string, select: any[] = ["id"]) {
		return User.findOneOrFail({ where: { email }, select });
	}

	static sendMail({ rollNumber, name, htmlPart, subject }: SendMailOptions) {
		if (process.env.NODE_ENV === "production") {
			return mailjet.post("send", { version: "v3" }).request({
				FromEmail: "prime@shaastra.org",
				FromName: "Shaastra Prime Bot",
				Recipients: [
					{
						Email: `${rollNumber.toLowerCase()}@smail.iitm.ac.in`,
						Name: name
					}
				],
				Subject: subject,
				"Html-part": htmlPart
			});
		} else return Promise.resolve();
	}

	static generateOTP() {
		return Math.floor(100000 + Math.random() * 900000).toString();
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

	@ManyToOne(() => Department, (dept) => dept.members)
	@Field(() => Department)
	department: Department;

	@Column()
	departmentId: string;

	@ManyToMany(() => Channel, (channel) => channel.members)
	channels: Channel[];

	@OneToMany(() => Media, (media) => media.uploadedBy)
	media: Media[];

	@ManyToMany(() => Task, (task) => task.assignedTo)
	@JoinTable()
	tasksAssigned: Task[];

	@OneToMany(() => Invoice, (invoice) => invoice.uploadedBy)
	invoicesSubmitted: Invoice[];

	@ManyToOne(() => Message, (msg) => msg.createdBy)
	messages: Message[];

	@OneToMany(() => Channel, (channel) => channel.createdBy)
	channelsCreated: Channel[];

	@OneToMany(() => Task, (task) => task.createdBy)
	tasksCreated: Task[];

	@OneToMany(() => Update, (update) => update.postedBy)
	updates: Update[];

	@OneToMany(() => Vertical, (vertical) => vertical.updatedBy)
	verticalsUpdated: Vertical[];

	@OneToMany(() => Event, (event) => event.updatedBy)
	eventsUpdated: Event[];

	@OneToMany(() => TaskActivity, (activity) => activity.createdBy)
	taskActivity: Promise<TaskActivity[]>;

	@OneToMany(() => InvoiceActivity, (activity) => activity.createdBy)
	invoiceActivity: Promise<InvoiceActivity[]>;

	@OneToMany(() => Department, (dept) => dept.finManager)
	finManagerForDepts: Department[];
}

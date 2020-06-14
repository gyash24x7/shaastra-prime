import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn
} from "typeorm";
import { InvoiceStatus, InvoiceType } from "../utils";
import { Channel } from "./Channel";
import { Department } from "./Department";
import { InvoiceActivity } from "./InvoiceActivity";
import { Media } from "./Media";
import { User } from "./User";
import { Vendor } from "./Vendor";

registerEnumType(InvoiceStatus, { name: "InvoiceStatus" });
registerEnumType(InvoiceType, { name: "InvoiceType" });

@Entity("Invoice")
@ObjectType("Invoice")
export class Invoice extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = [
		"id",
		"title",
		"date",
		"invoiceNumber",
		"amount",
		"purpose",
		"status",
		"type"
	];

	static relationalFields = [
		"media",
		"activity",
		"uploadedBy",
		"byDept",
		"vendor",
		"channels"
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

	@Column()
	@Field()
	title: string;

	@Column("timestamp")
	@Field()
	date: string;

	@Column()
	@Field()
	invoiceNumber: string;

	@Column()
	@Field()
	amount: string;

	@Column()
	@Field()
	purpose: string;

	@Column("enum", { enum: InvoiceStatus })
	@Field(() => InvoiceStatus)
	status: InvoiceStatus;

	@Column("enum", { enum: InvoiceType })
	@Field(() => InvoiceType)
	type: InvoiceType;

	// RELATIONS AND FOREIGN KEYS

	@OneToOne(() => Media, { lazy: true })
	@JoinColumn()
	@Field(() => Media)
	media: Promise<Media>;

	@OneToMany(() => InvoiceActivity, (activity) => activity.invoice, {
		lazy: true
	})
	@Field(() => [InvoiceActivity])
	activity: Promise<InvoiceActivity[]>;

	@ManyToOne(() => User, (user) => user.invoicesSubmitted, { lazy: true })
	@Field(() => User)
	uploadedBy: Promise<User>;

	@Column()
	uploadedById: string;

	@ManyToOne(() => Department, (dept) => dept.invoicesSubmitted, { lazy: true })
	@Field(() => Department)
	byDept: Promise<Department>;

	@Column()
	byDeptId: string;

	@ManyToOne(() => Vendor, (vendor) => vendor.invoices, { lazy: true })
	@Field(() => Vendor)
	vendor: Promise<Vendor>;

	@Column()
	vendorId: string;

	@ManyToMany(() => Channel, { lazy: true })
	@JoinTable()
	@Field(() => [Channel])
	channels: Promise<Channel[]>;
}

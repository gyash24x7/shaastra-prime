import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
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
export class Invoice {
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

	//db only field for soft delete
	@Column({ default: false })
	deleted: boolean;

	// RELATIONS AND FOREIGN KEYS

	@OneToOne(() => Media, { cascade: true })
	@JoinColumn()
	@Field(() => Media)
	media: Media;

	@OneToMany(() => InvoiceActivity, (activity) => activity.invoice)
	@Field(() => [InvoiceActivity])
	activity: InvoiceActivity[];

	@ManyToOne(() => User, (user) => user.invoicesSubmitted, {
		onDelete: "SET NULL"
	})
	@Field(() => User, { nullable: true })
	uploadedBy?: User;

	@Column({ nullable: true })
	uploadedById: string;

	@ManyToOne(() => Department, (dept) => dept.invoicesSubmitted, {
		onDelete: "CASCADE"
	})
	@Field(() => Department)
	byDept: Department;

	@Column()
	byDeptId: string;

	@ManyToOne(() => Vendor, (vendor) => vendor.invoices)
	@Field(() => Vendor)
	vendor: Vendor;

	@Column()
	vendorId: string;

	@ManyToMany(() => Channel)
	@JoinTable()
	@Field(() => [Channel])
	channels: Channel[];
}

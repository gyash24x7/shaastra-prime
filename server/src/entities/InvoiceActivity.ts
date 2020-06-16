import cuid from "cuid";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { InvoiceActivityType } from "../utils";
import { Invoice } from "./Invoice";
import { User } from "./User";

registerEnumType(InvoiceActivityType, { name: "InvoiceActivityType" });

@Entity("InvoiceActivity")
@ObjectType("InvoiceActivity")
export class InvoiceActivity extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = ["id", "type", "createdOn", "description"];

	static relationalFields = ["invoice", "createdBy"];

	// LISTENERS

	@BeforeInsert()
	setId() {
		this.id = cuid();
	}

	// PRIMARY FIELDS

	@PrimaryColumn()
	@Field(() => ID)
	id: string;

	@Column("enum", { enum: InvoiceActivityType })
	@Field(() => InvoiceActivityType)
	type: InvoiceActivityType;

	@CreateDateColumn()
	@Field()
	createdOn: string;

	@Column()
	@Field()
	description: string;

	// RELATIONS AND FOREIGN KEYS

	@ManyToOne(() => Invoice, (invoice) => invoice.activity, { lazy: true })
	invoice: Promise<Invoice>;

	@Column()
	invoiceId: string;

	@ManyToOne(() => User, (user) => user.invoiceActivity, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@Column()
	createdById: string;
}

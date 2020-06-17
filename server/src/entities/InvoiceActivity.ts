import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
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
export class InvoiceActivity {
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

	@ManyToOne(() => Invoice, (invoice) => invoice.activity, {
		onDelete: "CASCADE"
	})
	invoice: Invoice;

	@Column()
	invoiceId: string;

	@ManyToOne(() => User, (user) => user.invoiceActivity)
	@Field(() => User)
	createdBy: User;

	@Column()
	createdById: string;
}

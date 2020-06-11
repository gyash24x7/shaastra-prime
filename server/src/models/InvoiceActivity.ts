import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { InvoiceActivityType } from "../utils";
import { Invoice } from "./Invoice";
import { Message } from "./Message";
import { User } from "./User";

registerEnumType(InvoiceActivityType, { name: "InvoiceActivityType" });

@Entity("InvoiceActivity")
@ObjectType("InvoiceActivity")
export class InvoiceActivity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
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

	@ManyToOne(() => Invoice, (invoice) => invoice.activity, { lazy: true })
	invoice: Promise<Invoice>;

	@ManyToOne(() => User, (user) => user.invoiceActivity, { lazy: true })
	@Field(() => User)
	createdBy: Promise<User>;

	@OneToMany(() => Message, (message) => message.invoiceActivity, {
		lazy: true
	})
	messages: Promise<Message[]>;
}

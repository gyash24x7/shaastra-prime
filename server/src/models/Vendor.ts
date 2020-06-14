import cuid from "cuid";
import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("Vendor")
@ObjectType("Vendor")
export class Vendor extends BaseEntity {
	// STATIC FIELDS

	static primaryFields = [
		"id",
		"name",
		"gstNumber",
		"accountName",
		"accountNumber",
		"ifsc",
		"bankDetails"
	];

	static relationalFields = ["invoices"];

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
	name: string;

	@Column()
	@Field()
	gstNumber: string;

	@Column()
	@Field()
	accountName: string;

	@Column()
	@Field()
	accountNumber: string;

	@Column()
	@Field()
	ifsc: string;

	@Column()
	@Field()
	bankDetails: string;

	// RELATIONS AND FOREIGN KEYS

	@OneToMany(() => Invoice, (invoice) => invoice.vendor, { lazy: true })
	@Field(() => [Invoice])
	invoices: Promise<Invoice[]>;
}

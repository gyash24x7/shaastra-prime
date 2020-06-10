import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("Vendor")
@ObjectType("Vendor")
export class Vendor extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
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

	@OneToMany(() => Invoice, (invoice) => invoice.vendor, { lazy: true })
	@Field(() => [Invoice])
	invoices: Promise<Invoice[]>;
}

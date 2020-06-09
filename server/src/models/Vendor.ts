import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice";

@Entity("Vendor")
@ObjectType("Vendor")
export class Vendor {
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

	@Field(() => [Invoice]) invoices: Invoice[];
}

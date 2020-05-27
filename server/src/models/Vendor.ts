import { Field, ID, ObjectType } from "type-graphql";
import { Invoice } from "./Invoice";

@ObjectType("Vendor")
export class Vendor {
	@Field(() => ID) id: string;
	@Field() name: string;
	@Field() gstNumber: string;
	@Field() accountName: string;
	@Field() accountNumber: string;
	@Field() ifsc: string;
	@Field() bankDetails: string;
	@Field(() => [Invoice]) invoices: Invoice[];
}

import { Field, ID, ObjectType } from "type-graphql";

import { Invoice } from "./Invoice";

@ObjectType()
export class Vendor {
	@Field(() => ID) id: number;
	@Field() name: string;
	@Field() gstNumber: string;
	@Field() accountName: string;
	@Field() accountNumber: string;
	@Field() ifsc: string;
	@Field() bankDetails: string;
	@Field(() => [Invoice]) invoices: Invoice[];
}

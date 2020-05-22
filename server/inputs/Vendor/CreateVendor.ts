import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVendorInput {
	@Field() name: string;
	@Field() gstNumber: string;
	@Field() accountName: string;
	@Field() accountNumber: string;
	@Field() ifsc: string;
	@Field() bankDetails: string;
}

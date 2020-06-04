import { Field, InputType } from "type-graphql";

@InputType("CreateVendorInput")
export class CreateVendorInput {
	@Field() name: string;
	@Field() gstNumber: string;
	@Field({ nullable: true }) accountName?: string;
	@Field({ nullable: true }) accountNumber?: string;
	@Field({ nullable: true }) ifsc?: string;
	@Field({ nullable: true }) bankDetails?: string;
}

import { Field, InputType } from "type-graphql";
import { InvoiceType, MediaType } from "../../utils";

@InputType()
export class SubmitInvoiceInput {
	@Field() invoiceNumber: string;
	@Field() date: string;
	@Field() amount: string;
	@Field() purpose: string;
	@Field(() => InvoiceType) type: InvoiceType;
	@Field(() => MediaType) mediaType: MediaType;
	@Field() fileUrl: string;
	@Field() title: string;
	@Field() vendorId: string;
	@Field(() => [String]) channelIds: string[];
}

import { Field, InputType } from "type-graphql";

@InputType()
export class RejectInvoiceInput {
	@Field() invoiceId: string;
	@Field() reason: string;
}

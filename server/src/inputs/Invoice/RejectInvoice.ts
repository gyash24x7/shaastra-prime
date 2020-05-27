import { Field, InputType } from "type-graphql";

@InputType("RejectInvoiceInput")
export class RejectInvoiceInput {
	@Field() invoiceId: string;
	@Field() reason: string;
}

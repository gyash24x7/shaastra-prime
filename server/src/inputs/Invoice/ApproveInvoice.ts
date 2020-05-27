import { Field, InputType } from "type-graphql";

@InputType("ApproveInvoiceInput")
export class ApproveInvoiceInput {
	@Field() currentStage: string;
	@Field() invoiceId: string;
}

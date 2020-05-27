import { Field, InputType } from "type-graphql";

@InputType()
export class ApproveInvoiceInput {
	@Field() currentStage: string;
	@Field() invoiceId: string;
}

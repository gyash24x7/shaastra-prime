import { Field, InputType } from "type-graphql";

@InputType()
export class AttachMediaToInvoiceInput {
	@Field() invoiceId: string;
	@Field({ nullable: true }) mediaId?: string;
	@Field() newUrl: string;
	@Field() mediaType: string;
}

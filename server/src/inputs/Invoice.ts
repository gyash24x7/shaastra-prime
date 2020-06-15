import { Field, InputType } from "type-graphql";
import { InvoiceType, MediaType } from "../utils";

@InputType("ApproveInvoiceInput")
export class ApproveInvoiceInput {
	@Field() currentStage: string;
	@Field() invoiceId: string;
}

@InputType("ConnectChannelsToInvoiceInput")
export class ConnectChannelsToInvoiceInput {
	@Field() invoiceId: string;
	@Field(() => [String]) channelIds: string[];
}

@InputType("RejectInvoiceInput")
export class RejectInvoiceInput {
	@Field() invoiceId: string;
	@Field() reason: string;
}

@InputType("SubmitInvoiceInput")
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

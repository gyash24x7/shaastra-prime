import { Field, InputType } from "type-graphql";

@InputType("ConnectChannelsToInvoiceInput")
export class ConnectChannelsToInvoiceInput {
	@Field() invoiceId: string;
	@Field(() => [String]) channelIds: string[];
}

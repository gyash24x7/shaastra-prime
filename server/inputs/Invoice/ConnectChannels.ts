import { Field, InputType } from "type-graphql";

@InputType()
export class ConnectChannelsToInvoiceInput {
	@Field() invoiceId: string;
	@Field(() => [String]) channelIds: string[];
}

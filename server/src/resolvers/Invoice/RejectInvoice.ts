import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { RejectInvoiceInput } from "../../inputs/Invoice/RejectInvoice";
import { Invoice } from "../../models/Invoice";
import { InvoiceActivity } from "../../models/InvoiceActivity";
import { Message } from "../../models/Message";
import {
	GraphQLContext,
	InvoiceActivityType,
	InvoiceStatus,
	MessageType
} from "../../utils";

@Resolver()
export class RejectInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async rejectInvoice(
		@Arg("data") { reason, invoiceId }: RejectInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Invoice.update(invoiceId, {
			status: InvoiceStatus.REJECTED
		});

		const activity = await InvoiceActivity.create({
			createdBy: Promise.resolve(user),
			description: `${user?.name} rejected the invoice. ${reason}`,
			type: InvoiceActivityType.REJECTED
		}).save();

		const invoice = await Invoice.findOne(invoiceId);
		const channels = await invoice!.channels;

		Promise.all(
			channels.map((channel) =>
				Message.create({
					channel: Promise.resolve(channel),
					content: "",
					invoiceActivity: Promise.resolve(activity),
					type: MessageType.INVOICE_ACTIVITY,
					createdBy: Promise.resolve(user)
				}).save()
			)
		).then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return !!affected;
	}
}

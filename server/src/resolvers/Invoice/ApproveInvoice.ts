import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ApproveInvoiceInput } from "../../inputs/Invoice/ApproveInvoice";
import { Invoice } from "../../models/Invoice";
import { InvoiceActivity } from "../../models/InvoiceActivity";
import { Message } from "../../models/Message";
import {
	APPROVAL_STAGES,
	GraphQLContext,
	InvoiceActivityType,
	InvoiceStatus,
	MessageType
} from "../../utils";

@Resolver()
export class ApproveInvoiceResolver {
	@Authorized("CORE", "HEAD", "COCAD")
	@Mutation(() => Boolean)
	async approveInvoice(
		@Arg("data") { invoiceId, currentStage }: ApproveInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Invoice.update(invoiceId, {
			status: APPROVAL_STAGES[
				APPROVAL_STAGES.findIndex((stage) => stage === currentStage) + 1
			] as InvoiceStatus
		});

		const invoice = await Invoice.findOne(invoiceId);

		if (!invoice || !affected) return false;

		const activity = await InvoiceActivity.create({
			type: InvoiceActivityType.APPROVED,
			createdBy: Promise.resolve(user),
			description: `${user?.name} approved the Invoice.`,
			invoice: Promise.resolve(invoice)
		}).save();

		const messageChannels = await invoice.channels;

		Promise.all(
			messageChannels.map((channel) =>
				Message.create({
					channel: Promise.resolve(channel),
					createdBy: Promise.resolve(user),
					type: MessageType.INVOICE_ACTIVITY,
					content: "",
					invoiceActivity: Promise.resolve(activity)
				}).save()
			)
		).then(() => {
			console.log("Invoice Update sent to Channels!");
		});

		return true;
	}
}

import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { SubmitInvoiceInput } from "../../inputs/Invoice/SubmitInvoice";
import { Channel } from "../../models/Channel";
import { Invoice } from "../../models/Invoice";
import { InvoiceActivity } from "../../models/InvoiceActivity";
import { Media } from "../../models/Media";
import { Message } from "../../models/Message";
import { Vendor } from "../../models/Vendor";
import {
	GraphQLContext,
	InvoiceActivityType,
	MediaType,
	MessageType,
	UserRole
} from "../../utils";
import { getInvoiceStatus } from "../../utils/getInvoiceStatus";

@Resolver()
export class SubmitInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async submitInvoice(
		@Arg("data") data: SubmitInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const dept = await user.department;

		const media = await Media.create({
			url: data.fileUrl,
			type: MediaType.IMAGE,
			uploadedBy: Promise.resolve(user)
		}).save();

		const invoice = await Invoice.create({
			title: data.title,
			amount: data.amount,
			type: data.type,
			purpose: data.purpose,
			invoiceNumber: data.invoiceNumber,
			date: data.date,
			media: Promise.resolve(media),
			status: getInvoiceStatus(
				user!.role,
				user!.role !== UserRole.COORD && dept.name === "FINANCE"
			),
			vendor: Vendor.findOne(data.vendorId),
			byDept: user.department,
			uploadedBy: Promise.resolve(user),
			channels: Channel.findByIds(data.channelIds)
		}).save();

		const activity = await InvoiceActivity.create({
			description: `${user?.name} uploaded the invoice.`,
			type: InvoiceActivityType.UPLOADED,
			createdBy: Promise.resolve(user),
			invoice: Promise.resolve(invoice)
		}).save();

		const messageChannels = await invoice.channels;

		Promise.all(
			messageChannels.map((channel) =>
				Message.create({
					channel: Promise.resolve(channel),
					content: "",
					type: MessageType.INVOICE_ACTIVITY,
					createdBy: Promise.resolve(user),
					invoiceActivity: Promise.resolve(activity)
				}).save()
			)
		).then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return !!invoice;
	}
}

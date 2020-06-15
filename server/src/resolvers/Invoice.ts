import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
	ApproveInvoiceInput,
	ConnectChannelsToInvoiceInput,
	RejectInvoiceInput,
	SubmitInvoiceInput
} from "../inputs/Invoice";
import { Channel } from "../models/Channel";
import { Invoice } from "../models/Invoice";
import { InvoiceActivity } from "../models/InvoiceActivity";
import { Media } from "../models/Media";
import { Message } from "../models/Message";
import { Vendor } from "../models/Vendor";
import {
	APPROVAL_STAGES,
	GraphQLContext,
	InvoiceActivityType,
	InvoiceStatus,
	MediaType,
	MessageType,
	UserRole
} from "../utils";
import { getInvoiceStatus } from "../utils/getInvoiceStatus";

@Resolver()
export class InvoiceResolver {
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

		Message.create({
			channels: Promise.resolve(messageChannels),
			createdBy: Promise.resolve(user),
			type: MessageType.INVOICE_ACTIVITY,
			content: "",
			invoiceActivity: Promise.resolve(activity)
		})
			.save()
			.then(() => {
				console.log("Invoice Update sent to Channels!");
			});

		return true;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToInvoice(
		@Arg("data") { channelIds, invoiceId }: ConnectChannelsToInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channels = await Channel.findByIds(channelIds);

		const { affected } = await Invoice.update(invoiceId, {
			channels: Channel.findByIds([...channelIds, channels.map(({ id }) => id)])
		});

		const activity = await InvoiceActivity.create({
			description:
				`${user.name} ` +
				"connected the following channels to this invoice: " +
				`${channels?.map(({ name }) => name + ", ")}`,
			type: InvoiceActivityType.CONNECT_CHANNEL,
			createdBy: Promise.resolve(user)
		}).save();

		Message.create({
			channels: Promise.resolve(channels),
			content: "",
			type: MessageType.INVOICE_ACTIVITY,
			createdById: user.id,
			invoiceActivity: Promise.resolve(activity)
		})
			.save()
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!affected;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteInvoice(@Arg("invoiceId") invoiceId: string) {
		const { affected } = await Invoice.delete(invoiceId);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Invoice])
	async getInvoices(
		@Arg("type") type: string,
		@Ctx() { user }: GraphQLContext
	) {
		const userDept = await user.department;

		switch (type) {
			case "REJECTED":
				return (await user.invoicesSubmitted).filter(
					(invoice) => invoice.status === InvoiceStatus.REJECTED
				);

			case "PENDING":
				return (await userDept.invoicesSubmitted).filter(
					(invoice) =>
						invoice.status ===
						getInvoiceStatus(
							user.role,
							user.role !== "COORD" && userDept.name === "FINANCE",
							true
						)
				);

			default:
				return (await user.invoicesSubmitted).filter(
					(invoice) => invoice.status !== InvoiceStatus.REJECTED
				);
		}
	}

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

		Message.create({
			channels: Promise.resolve(channels),
			content: "",
			invoiceActivity: Promise.resolve(activity),
			type: MessageType.INVOICE_ACTIVITY,
			createdBy: Promise.resolve(user)
		})
			.save()
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!affected;
	}

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

		Message.create({
			channels: Promise.resolve(messageChannels),
			content: "",
			type: MessageType.INVOICE_ACTIVITY,
			createdBy: Promise.resolve(user),
			invoiceActivity: Promise.resolve(activity)
		})
			.save()
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!invoice;
	}
}

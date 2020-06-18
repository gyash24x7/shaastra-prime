import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Channel } from "../entities/Channel";
import { Department } from "../entities/Department";
import { Invoice } from "../entities/Invoice";
import { InvoiceActivity } from "../entities/InvoiceActivity";
import { Media } from "../entities/Media";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { Vendor } from "../entities/Vendor";
import {
	ApproveInvoiceInput,
	ConnectChannelsToInvoiceInput,
	RejectInvoiceInput,
	SubmitInvoiceInput
} from "../inputs/Invoice";
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
import getSelectAndRelation from "../utils/getSelectAndRelation";

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

		if (affected === 0) return false;

		const activity = InvoiceActivity.create({
			type: InvoiceActivityType.APPROVED,
			createdById: user.id,
			description: `${user?.name} approved the Invoice.`,
			invoiceId
		});

		const { channels } = await Invoice.findOneOrFail(invoiceId, {
			relations: ["channels"]
		});

		const message = new Message();
		message.channels = channels;
		message.content = "";
		message.type = MessageType.INVOICE_ACTIVITY;
		message.createdById = user.id;
		message.invoiceActivityId = activity.id;

		message.save().then(() => {
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
		let invoice = await Invoice.findOneOrFail(invoiceId, {
			relations: ["channels"]
		});

		invoice.channels.push(...channels);
		await invoice.save();

		const activity = await InvoiceActivity.create({
			description:
				`${user.name} ` +
				"connected the following channels to this invoice: " +
				`${channels?.map(({ name }) => name + ", ")}`,
			type: InvoiceActivityType.CONNECT_CHANNEL,
			createdById: user.id,
			invoiceId
		}).save();

		const message = new Message();
		message.channels = invoice.channels;
		message.content = "";
		message.type = MessageType.INVOICE_ACTIVITY;
		message.createdById = user.id;
		message.invoiceActivityId = activity.id;

		message.save().then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return !!invoice;
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
		@Ctx() { user }: GraphQLContext,
		@Info() info: any
	) {
		const { select, relations } = getSelectAndRelation(info, Invoice);

		switch (type) {
			case "REJECTED":
				return Invoice.find({
					where: { status: InvoiceStatus.REJECTED, uploadedById: user.id },
					select,
					relations
				});

			case "PENDING":
				return Invoice.find({
					where: {
						status: getInvoiceStatus(
							user.role,
							user.role !== "COORD" && user.department.name === "FINANCE",
							true
						),
						byDeptId: user.departmentId
					},
					select,
					relations
				});

			default:
				return (
					await Invoice.find({
						where: { uploadedById: user.id },
						select,
						relations
					})
				).filter((invoice) => invoice.status !== InvoiceStatus.REJECTED);
		}
	}

	@Authorized()
	@Mutation(() => Boolean)
	async rejectInvoice(
		@Arg("data") { reason, invoiceId }: RejectInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		let invoice = await Invoice.findOneOrFail(invoiceId, {
			relations: ["channels"]
		});

		const { affected } = await Invoice.update(invoiceId, {
			status: InvoiceStatus.REJECTED
		});

		const activity = await InvoiceActivity.create({
			createdById: user.id,
			description: `${user?.name} rejected the invoice. ${reason}`,
			type: InvoiceActivityType.REJECTED,
			invoiceId
		}).save();

		const message = new Message();
		message.channels = invoice.channels;
		message.content = "";
		message.type = MessageType.INVOICE_ACTIVITY;
		message.createdById = user.id;
		message.invoiceActivityId = activity.id;

		message.save().then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return affected === 1;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async submitInvoice(
		@Arg("data") data: SubmitInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channels = await Channel.findByIds(data.channelIds);

		const media = await Media.create({
			url: data.fileUrl,
			type: MediaType.IMAGE,
			uploadedById: user.id
		}).save();

		const invoice = await Invoice.create({
			title: data.title,
			amount: data.amount,
			type: data.type,
			purpose: data.purpose,
			invoiceNumber: data.invoiceNumber,
			date: data.date,
			status: getInvoiceStatus(
				user!.role,
				user!.role !== UserRole.COORD && user.department.name === "FINANCE"
			),
			byDept: user.department,
			uploadedById: user.id,
			vendorId: data.vendorId,
			channels,
			mediaId: media.id
		}).save();

		const activity = await InvoiceActivity.create({
			description: `${user?.name} uploaded the invoice.`,
			type: InvoiceActivityType.UPLOADED,
			createdById: user.id,
			invoiceId: invoice.id
		}).save();

		const message = new Message();
		message.channels = channels;
		message.content = "";
		message.type = MessageType.INVOICE_ACTIVITY;
		message.createdById = user.id;
		message.invoiceActivityId = activity.id;

		message.save().then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return !!invoice;
	}

	@FieldResolver()
	async vendor(@Root() { vendorId, vendor }: Invoice) {
		if (vendor) return vendor;
		return Vendor.findOne(vendorId);
	}

	@FieldResolver()
	async uploadedBy(@Root() { uploadedById, uploadedBy }: Invoice) {
		if (uploadedBy) return uploadedBy;
		return User.findOne(uploadedById);
	}

	@FieldResolver()
	async byDept(@Root() { byDeptId, byDept }: Invoice) {
		if (byDept) return byDept;
		return Department.findOne(byDeptId);
	}

	@FieldResolver()
	async activity(@Root() { activity, id }: Invoice) {
		if (activity) return activity;
		return InvoiceActivity.find({ where: { invoiceId: id } });
	}

	@FieldResolver()
	async channels(@Root() { channels, id }: Invoice) {
		if (channels) return channels;
		const invoice = await Invoice.findOne(id, { relations: ["channels"] });
		return invoice?.channels;
	}

	@FieldResolver()
	async media(@Root() { mediaId, media }: Invoice) {
		if (media) return media;
		return Media.findOne(mediaId);
	}
}

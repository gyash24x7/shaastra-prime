import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Invoice } from "../entities/Invoice";
import {
	ApproveInvoiceInput,
	ConnectChannelsToInvoiceInput,
	RejectInvoiceInput,
	SubmitInvoiceInput
} from "../inputs/Invoice";
import { ChannelRepository } from "../repositories/Channel";
import { InvoiceRepository } from "../repositories/Invoice";
import { InvoiceActivityRepository } from "../repositories/InvoiceActivity";
import { MediaRepository } from "../repositories/Media";
import { MessageRepository } from "../repositories/Message";
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
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class InvoiceResolver {
	@InjectRepository()
	private readonly invoiceRepo: InvoiceRepository;

	@InjectRepository()
	private readonly channelRepo: ChannelRepository;

	@InjectRepository()
	private readonly messageRepo: MessageRepository;

	@InjectRepository()
	private readonly mediaRepo: MediaRepository;

	@InjectRepository()
	private readonly invoiceActivityRepo: InvoiceActivityRepository;

	@Authorized("CORE", "HEAD", "COCAD")
	@Mutation(() => Boolean)
	async approveInvoice(
		@Arg("data") { invoiceId, currentStage }: ApproveInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const invoice = await this.invoiceRepo.save({
			id: invoiceId,
			status: APPROVAL_STAGES[
				APPROVAL_STAGES.findIndex((stage) => stage === currentStage) + 1
			] as InvoiceStatus
		});

		if (!invoice) return false;

		const activity = this.invoiceActivityRepo.create({
			type: InvoiceActivityType.APPROVED,
			createdById: user.id,
			description: `${user?.name} approved the Invoice.`,
			invoiceId
		});

		const { channels } = await this.invoiceRepo.findOneOrFail(invoice.id, {
			relations: ["channels"]
		});

		this.messageRepo
			.save({
				channels,
				createdById: user.id,
				type: MessageType.INVOICE_ACTIVITY,
				content: "",
				invoiceActivity: activity
			})
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
		const channels = await this.channelRepo.findByIds(channelIds);
		let invoice = await this.invoiceRepo.findOneOrFail(invoiceId, {
			relations: ["channels"]
		});

		invoice.channels.push(...channels);
		invoice = await this.invoiceRepo.save(invoice);

		const activity = this.invoiceActivityRepo.create({
			description:
				`${user.name} ` +
				"connected the following channels to this invoice: " +
				`${channels?.map(({ name }) => name + ", ")}`,
			type: InvoiceActivityType.CONNECT_CHANNEL,
			createdById: user.id,
			invoiceId
		});

		this.messageRepo
			.save({
				channels: invoice.channels,
				content: "",
				type: MessageType.INVOICE_ACTIVITY,
				createdById: user.id,
				invoiceActivity: activity
			})
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!invoice;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteInvoice(@Arg("invoiceId") invoiceId: string) {
		const { affected } = await this.invoiceRepo.delete(invoiceId);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Invoice])
	async getInvoices(
		@Arg("type") type: string,
		@Ctx() { user }: GraphQLContext,
		@Info() info: any
	) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.invoiceRepo
		);

		switch (type) {
			case "REJECTED":
				return this.invoiceRepo.find({
					where: { status: InvoiceStatus.REJECTED, uploadedById: user.id },
					select,
					relations
				});

			case "PENDING":
				return this.invoiceRepo.find({
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
					await this.invoiceRepo.find({
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
		let invoice = await this.invoiceRepo.findOne(invoiceId, {
			relations: ["channels"]
		});

		invoice = await this.invoiceRepo.save({
			id: invoiceId,
			status: InvoiceStatus.REJECTED
		});

		const activity = this.invoiceActivityRepo.create({
			createdById: user.id,
			description: `${user?.name} rejected the invoice. ${reason}`,
			type: InvoiceActivityType.REJECTED,
			invoiceId
		});

		this.messageRepo
			.save({
				channels: invoice.channels,
				content: "",
				invoiceActivity: activity,
				type: MessageType.INVOICE_ACTIVITY,
				createdById: user.id
			})
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!invoice;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async submitInvoice(
		@Arg("data") data: SubmitInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const channels = await this.channelRepo.findByIds(data.channelIds);

		const media = this.mediaRepo.create({
			url: data.fileUrl,
			type: MediaType.IMAGE,
			uploadedById: user.id
		});

		const invoice = await this.invoiceRepo.save({
			title: data.title,
			amount: data.amount,
			type: data.type,
			purpose: data.purpose,
			invoiceNumber: data.invoiceNumber,
			date: data.date,
			media,
			status: getInvoiceStatus(
				user!.role,
				user!.role !== UserRole.COORD && user.department.name === "FINANCE"
			),
			byDept: user.department,
			uploadedById: user.id,
			vendorId: data.vendorId,
			channels
		});

		const activity = this.invoiceActivityRepo.create({
			description: `${user?.name} uploaded the invoice.`,
			type: InvoiceActivityType.UPLOADED,
			createdById: user.id,
			invoiceId: invoice.id
		});

		this.messageRepo
			.save({
				channels,
				content: "",
				type: MessageType.INVOICE_ACTIVITY,
				createdById: user.id,
				invoiceActivity: activity
			})
			.then(() => {
				console.log("Invoice Update Messages Sent!");
			});

		return !!invoice;
	}
}

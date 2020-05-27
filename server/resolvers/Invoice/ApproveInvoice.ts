import {
	InvoiceActivityType,
	InvoiceStatus,
	MessageType
} from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ApproveInvoiceInput } from "../../inputs/Invoice/ApproveInvoice";
import { APPROVAL_STAGES, GraphQLContext } from "../../utils";
import { prisma } from "./../../prisma";

@Resolver()
export class ApproveInvoiceResolver {
	@Authorized("CORE", "HEAD", "COCAD")
	@Mutation(() => Boolean)
	async approveInvoice(
		@Arg("data") { invoiceId, currentStage }: ApproveInvoiceInput,
		@Ctx() { user }: GraphQLContext
	) {
		const invoice = await prisma.invoice.update({
			where: { id: invoiceId },
			data: {
				status: APPROVAL_STAGES[
					APPROVAL_STAGES.findIndex((stage) => stage === currentStage) + 1
				] as InvoiceStatus,
				activity: {
					create: {
						type: InvoiceActivityType.APPROVED,
						by: { connect: { id: user!.id } },
						description: `${user?.name} approved the Invoice.`
					}
				}
			},
			include: { channels: { select: { id: true } } }
		});

		Promise.all(
			invoice.channels.map(({ id }) =>
				prisma.message.create({
					data: {
						channel: { connect: { id } },
						createdBy: { connect: { id: user?.id } },
						type: MessageType.INVOICE_UPDATE,
						content: `
							<p>[INVOICE_UPDATE: ${invoice.title}]</p>
							<p>${user?.name} approved the invoice.</p>
						`
					}
				})
			)
		).then(() => {
			console.log("Invoice Update sent to Channels!");
		});

		return !!invoice;
	}
}

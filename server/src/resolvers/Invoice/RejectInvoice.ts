import {
	InvoiceActivityType,
	InvoiceStatus,
	MessageType
} from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { RejectInvoiceInput } from "../../inputs/Invoice/RejectInvoice";
import { GraphQLContext } from "../../utils";

@Resolver()
export class RejectInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async rejectInvoice(
		@Arg("data") { reason, invoiceId }: RejectInvoiceInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const invoice = await prisma.invoice.update({
			where: { id: invoiceId },
			data: {
				status: InvoiceStatus.REJECTED,
				activity: {
					create: {
						by: { connect: { id: user!.id } },
						description: `${user?.name} rejected the invoice. ${reason}`,
						type: InvoiceActivityType.REJECTED
					}
				}
			},
			include: { channels: { select: { id: true } } }
		});

		Promise.all(
			invoice.channels.map((channel) =>
				prisma.message.create({
					data: {
						channel: { connect: { id: channel.id } },
						content: `
							<p><strong>[INVOICE UPDATE: ${invoice.title}]</strong></p>
              <p>${user?.name} rejected the invoice.</p>
              <p>${reason}</p>
						`,
						type: MessageType.INVOICE_ACTIVITY,
						createdBy: { connect: { id: user?.id } }
					}
				})
			)
		).then(() => {
			console.log("Invoice Update Messages Sent!");
		});

		return !!invoice;
	}
}

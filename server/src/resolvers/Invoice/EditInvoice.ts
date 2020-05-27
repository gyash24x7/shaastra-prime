import { InvoiceActivityType, MessageType, UserRole } from "@prisma/client";
import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { EditInvoiceInput } from "../../inputs/Invoice/EditInvoice";
import { GraphQLContext } from "../../utils";
import { getInvoiceStatus } from "../../utils/getInvoiceStatus";

@Resolver()
export class EditInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async editInvoice(
		@Arg("data") data: EditInvoiceInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const invoice = await prisma.invoice.update({
			where: { id: data.invoiceId },
			data: {
				title: data.title,
				amount: data.amount,
				type: data.type,
				purpose: data.purpose,
				invoiceNumber: data.invoiceNumber,
				date: moment(parseInt(data.date)).toDate(),
				status: getInvoiceStatus(
					user!.role,
					user!.role !== UserRole.COORD && user!.department.name === "FINANCE"
				),
				vendor: { connect: { id: data.vendorId } },
				activity: {
					create: {
						type: InvoiceActivityType.EDITED,
						description: `${user?.name} edited the invoice.`,
						by: { connect: { id: user?.id } }
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
							<p>${user?.name} edited the invoice.</p>
						`,
						type: MessageType.INVOICE_UPDATE,
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

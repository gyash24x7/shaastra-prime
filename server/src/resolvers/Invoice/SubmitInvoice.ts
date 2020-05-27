import { InvoiceActivityType, MessageType, UserRole } from "@prisma/client";
import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { SubmitInvoiceInput } from "../../inputs/Invoice/SubmitInvoice";
import { GraphQLContext } from "../../utils";
import { getInvoiceStatus } from "../../utils/getInvoiceStatus";

@Resolver()
export class SubmitInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async submitInvoice(
		@Arg("data") data: SubmitInvoiceInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const invoice = await prisma.invoice.create({
			data: {
				title: data.title,
				amount: data.amount,
				type: data.type,
				purpose: data.purpose,
				invoiceNumber: data.invoiceNumber,
				date: moment(parseInt(data.date)).toDate(),
				media: {
					create: {
						url: data.fileUrl,
						type: data.mediaType,
						uploadedBy: { connect: { id: user?.id } }
					}
				},
				status: getInvoiceStatus(
					user!.role,
					user!.role !== UserRole.COORD && user!.department.name === "FINANCE"
				),
				vendor: { connect: { id: data.vendorId } },
				byDept: { connect: { id: user?.department.id } },
				uploadedBy: { connect: { id: user?.id } },
				activity: {
					create: {
						type: InvoiceActivityType.UPLOADED,
						description: `${user?.name} uploaded the invoice.`,
						by: { connect: { id: user?.id } }
					}
				},
				channels: { connect: data.channelIds.map((id) => ({ id })) }
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
							<p>${user?.name} uploaded an invoice.</p>
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

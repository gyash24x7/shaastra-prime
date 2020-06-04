import { InvoiceActivityType, MediaType, MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AttachMediaToInvoiceInput } from "../../inputs/Invoice/AttachMedia";
import { GraphQLContext } from "../../utils/index";

@Resolver()
export class AttachMediaToInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async attachMediaToInvoice(
		@Arg("data")
		{ mediaId, invoiceId, newUrl, mediaType }: AttachMediaToInvoiceInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		let invoice = await prisma.invoice.update({
			where: { id: invoiceId },
			data: {
				media: {
					disconnect: { id: mediaId },
					create: {
						uploadedBy: { connect: { id: user!.id } },
						url: newUrl,
						type: mediaType as MediaType
					}
				},
				activity: {
					create: {
						by: { connect: { id: user!.id } },
						description: `${user?.name} uploaded a new file.`,
						type: InvoiceActivityType.ATTACH_MEDIA
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
							<p>${user?.name} uploaded a file related to the invoice.</p>
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

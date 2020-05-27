import { InvoiceActivityType, MessageType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ConnectChannelsToInvoiceInput } from "../../inputs/Invoice/ConnectChannels";
import { GraphQLContext } from "../../utils";

@Resolver()
export class ConnectChannelsToInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async connectChannelsToInvoice(
		@Arg("data") { channelIds, invoiceId }: ConnectChannelsToInvoiceInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const channels = await prisma.channel.findMany({
			where: { id: { in: channelIds } }
		});

		const invoice = await prisma.invoice.update({
			where: { id: invoiceId },
			data: {
				channels: { connect: channelIds.map((id) => ({ id })) },
				activity: {
					create: {
						description: `
              ${user?.name} connected the following channels to this invoice:
              ${channels?.map(({ name }) => name + ", ")}
            `,
						type: InvoiceActivityType.CONNECT_CHANNEL,
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
              <p>
                ${user?.name} connected the following channels to this invoice:
                ${channels?.map(({ name }) => name + ", ")}
              </p>`,
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

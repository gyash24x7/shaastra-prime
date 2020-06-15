import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { ConnectChannelsToInvoiceInput } from "../../inputs/Invoice";
import { Channel } from "../../models/Channel";
import { Invoice } from "../../models/Invoice";
import { InvoiceActivity } from "../../models/InvoiceActivity";
import { Message } from "../../models/Message";
import { GraphQLContext, InvoiceActivityType, MessageType } from "../../utils";

@Resolver()
export class ConnectChannelsToInvoiceResolver {
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
}

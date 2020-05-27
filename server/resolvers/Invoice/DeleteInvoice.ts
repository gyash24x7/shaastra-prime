import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class DeleteInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteInvoice(@Arg("invoiceId") invoiceId: string) {
		const invoice = await prisma.invoice.delete({ where: { id: invoiceId } });
		return !!invoice;
	}
}

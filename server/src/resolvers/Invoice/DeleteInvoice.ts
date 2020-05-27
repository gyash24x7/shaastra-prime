import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class DeleteInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteInvoice(
		@Arg("invoiceId") invoiceId: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const invoice = await prisma.invoice.delete({ where: { id: invoiceId } });
		return !!invoice;
	}
}

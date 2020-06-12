import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Invoice } from "../../models/Invoice";

@Resolver()
export class DeleteInvoiceResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async deleteInvoice(@Arg("invoiceId") invoiceId: string) {
		const { affected } = await Invoice.delete(invoiceId);
		return !!affected;
	}
}

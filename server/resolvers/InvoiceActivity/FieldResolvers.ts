import { FieldResolver, Resolver, Root } from "type-graphql";
import { InvoiceActivity } from "../../models/InvoiceActivity";
import { prisma } from "../../prisma";

@Resolver(InvoiceActivity)
export class InvoiceActivityFieldResolvers {
	@FieldResolver()
	invoice(@Root() { id }: InvoiceActivity) {
		return prisma.invoiceActivity.findOne({ where: { id } }).invoice();
	}
}

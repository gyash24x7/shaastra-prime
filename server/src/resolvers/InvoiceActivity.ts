import { FieldResolver, Resolver, Root } from "type-graphql";
import { Invoice } from "../entities/Invoice";
import { InvoiceActivity } from "../entities/InvoiceActivity";
import { User } from "../entities/User";

@Resolver(InvoiceActivity)
export class InvoiceActivityResolver {
	@FieldResolver()
	async createdBy(@Root() { createdById, createdBy }: InvoiceActivity) {
		if (createdBy) return createdBy;
		return User.findOne(createdById);
	}

	@FieldResolver()
	async invoice(@Root() { invoice, invoiceId }: InvoiceActivity) {
		if (invoice) return invoice;
		return Invoice.findOne(invoiceId);
	}
}

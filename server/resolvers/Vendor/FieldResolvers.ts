import { Vendor } from "models/Vendor";
import { prisma } from "prisma";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(Vendor)
export class VendorFieldResolvers {
	@FieldResolver()
	invoices(@Root() { id }: Vendor) {
		return prisma.vendor.findOne({ where: { id } }).invoices();
	}
}

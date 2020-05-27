import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Vendor } from "../../models/Vendor";
import { GraphQLContext } from "../../utils";

@Resolver(Vendor)
export class VendorFieldResolvers {
	@FieldResolver()
	invoices(@Root() { id }: Vendor, @Ctx() { prisma }: GraphQLContext) {
		return prisma.vendor.findOne({ where: { id } }).invoices();
	}
}

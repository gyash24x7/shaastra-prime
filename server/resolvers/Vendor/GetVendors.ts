import { Authorized, Query, Resolver } from "type-graphql";
import { Vendor } from "../../models/Vendor";
import { prisma } from "../../prisma";

@Resolver()
export class GetVendorsResolver {
	@Authorized()
	@Query(() => [Vendor])
	async getVendors() {
		return prisma.vendor.findMany();
	}
}

import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Vendor } from "../../models/Vendor";
import { GraphQLContext } from "../../utils";

@Resolver()
export class GetVendorsResolver {
	@Authorized()
	@Query(() => [Vendor])
	async getVendors(@Ctx() { prisma }: GraphQLContext) {
		return prisma.vendor.findMany();
	}
}

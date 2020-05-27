import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateVendorInput } from "../../inputs/Vendor/CreateVendor";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateVendorResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createVendor(
		@Arg("data") data: CreateVendorInput,
		@Ctx() { prisma }: GraphQLContext
	) {
		const vendor = await prisma.vendor.create({ data });
		return !!vendor;
	}
}

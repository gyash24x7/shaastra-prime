import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { CreateVendorInput } from "../../inputs/Vendor/CreateVendor";
import { prisma } from "../../prisma";

@Resolver()
export class CreateVendorResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createVendor(@Arg("data") data: CreateVendorInput) {
		const vendor = await prisma.vendor.create({ data });
		return !!vendor;
	}
}

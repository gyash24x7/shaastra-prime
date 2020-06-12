import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { CreateVendorInput } from "../../inputs/Vendor/CreateVendor";
import { Vendor } from "../../models/Vendor";

@Resolver()
export class CreateVendorResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createVendor(@Arg("data") data: CreateVendorInput) {
		const vendor = await Vendor.create({ ...data }).save();
		return !!vendor;
	}
}

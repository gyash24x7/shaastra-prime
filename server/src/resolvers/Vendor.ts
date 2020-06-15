import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { CreateVendorInput } from "../inputs/Vendor";
import { Vendor } from "../models/Vendor";

@Resolver()
export class VendorResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createVendor(@Arg("data") data: CreateVendorInput) {
		const vendor = await Vendor.create({ ...data }).save();
		return !!vendor;
	}

	@Authorized("HEAD", "CORE")
	@Mutation(() => Boolean)
	async deleteVendor(@Arg("vendorId") id: string) {
		const { affected } = await Vendor.delete(id);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Vendor])
	async getVendors() {
		return Vendor.find();
	}
}

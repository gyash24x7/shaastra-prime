import graphqlFields from "graphql-fields";
import { Arg, Authorized, Info, Mutation, Query, Resolver } from "type-graphql";
import { Vendor } from "../entities/Vendor";
import { CreateVendorInput } from "../inputs/Vendor";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

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
	async getVendors(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Vendor
		);
		return Vendor.find({ select, relations });
	}
}

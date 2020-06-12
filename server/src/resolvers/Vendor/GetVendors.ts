import { Authorized, Query, Resolver } from "type-graphql";
import { Vendor } from "../../models/Vendor";

@Resolver()
export class GetVendorsResolver {
	@Authorized()
	@Query(() => [Vendor])
	async getVendors() {
		return Vendor.find();
	}
}

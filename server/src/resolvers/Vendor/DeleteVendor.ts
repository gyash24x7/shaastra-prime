import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Vendor } from "../../models/Vendor";

@Resolver()
export class DeleteVendorResolver {
	@Authorized("HEAD", "CORE")
	@Mutation(() => Boolean)
	async deleteVendor(@Arg("vendorId") id: string) {
		const { affected } = await Vendor.delete(id);
		return !!affected;
	}
}

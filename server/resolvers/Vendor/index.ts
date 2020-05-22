import { CreateVendorResolver } from "./CreateVendor";
import { DeleteVendorResolver } from "./DeleteVendor";
import { VendorFieldResolvers } from "./FieldResolvers";
import { GetVendorsResolver } from "./GetVendors";

export default [
	CreateVendorResolver,
	DeleteVendorResolver,
	GetVendorsResolver,
	VendorFieldResolvers
];

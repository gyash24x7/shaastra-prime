import {
	Arg,
	Authorized,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Invoice } from "../entities/Invoice";
import { Vendor } from "../entities/Vendor";
import { CreateVendorInput } from "../inputs/Vendor";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver(Vendor)
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
		const { select, relations } = getSelectAndRelation(info, Vendor);
		return Vendor.find({ select, relations });
	}

	@FieldResolver()
	async invoices(@Root() { invoices, id }: Vendor) {
		if (invoices) return invoices;
		return Invoice.findOne(id);
	}
}

import graphqlFields from "graphql-fields";
import { Arg, Authorized, Info, Mutation, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Vendor } from "../entities/Vendor";
import { CreateVendorInput } from "../inputs/Vendor";
import { VendorRepository } from "../repositories/Vendor";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class VendorResolver {
	@InjectRepository()
	private readonly vendorRepo: VendorRepository;

	@Authorized()
	@Mutation(() => Boolean)
	async createVendor(@Arg("data") data: CreateVendorInput) {
		const vendor = await this.vendorRepo.save({ ...data });
		return !!vendor;
	}

	@Authorized("HEAD", "CORE")
	@Mutation(() => Boolean)
	async deleteVendor(@Arg("vendorId") id: string) {
		const { affected } = await this.vendorRepo.delete(id);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Vendor])
	async getVendors(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.vendorRepo
		);
		return this.vendorRepo.find({ select, relations });
	}
}

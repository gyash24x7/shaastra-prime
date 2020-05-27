import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { GraphQLContext } from "../../utils";

@Resolver()
export class DeleteVendorResolver {
	@Authorized("HEAD", "CORE")
	@Mutation(() => Boolean)
	async deleteVendor(
		@Arg("vendorId") id: string,
		@Ctx() { prisma }: GraphQLContext
	) {
		const vendor = await prisma.vendor.delete({ where: { id } });
		return !!vendor;
	}
}

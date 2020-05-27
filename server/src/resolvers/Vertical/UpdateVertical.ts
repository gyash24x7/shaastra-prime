import moment from "moment";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateVerticalInput } from "../../inputs/Vertical/UpdateVertical";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UpdateVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async updateVertical(
		@Arg("data") { name, info, verticalId }: UpdateVerticalInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		const vertical = await prisma.vertical.update({
			where: { id: verticalId },
			data: {
				name,
				info,
				updatedBy: { connect: { id: user!.id } },
				updatedOn: moment().toDate()
			}
		});
		return !!vertical;
	}
}

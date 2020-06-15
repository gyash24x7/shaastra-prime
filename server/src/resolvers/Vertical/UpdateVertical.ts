import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UpdateVerticalInput } from "../../inputs/Vertical";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext } from "../../utils";

@Resolver()
export class UpdateVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async updateVertical(
		@Arg("data") { name, info, verticalId }: UpdateVerticalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const { affected } = await Vertical.update(verticalId, {
			name,
			info,
			updatedBy: Promise.resolve(user)
		});
		return !!affected;
	}
}

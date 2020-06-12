import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateVerticalInput } from "../../inputs/Vertical/CreateVertical";
import { Media } from "../../models/Media";
import { Vertical } from "../../models/Vertical";
import { GraphQLContext, MediaType } from "../../utils";

@Resolver()
export class CreateVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async addVertical(
		@Arg("data") { name, info, imageUrl }: CreateVerticalInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image = Media.findOne();
		if (imageUrl) {
			image = Media.create({
				url: imageUrl,
				uploadedBy: Promise.resolve(user),
				type: MediaType.IMAGE
			}).save();
		}

		const vertical = await Vertical.create({
			name,
			info,
			image,
			updatedBy: Promise.resolve(user)
		}).save();

		return !!vertical;
	}
}

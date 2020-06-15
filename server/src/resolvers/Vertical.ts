import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateVerticalInput, UpdateVerticalInput } from "../inputs/Vertical";
import { Media } from "../models/Media";
import { Vertical } from "../models/Vertical";
import { GraphQLContext, MediaType } from "../utils";

@Resolver()
export class VerticalResolver {
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

	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async deleteVertical(@Arg("id") id: string) {
		const { affected } = await Vertical.delete(id);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Vertical])
	async getVerticals() {
		return await Vertical.find();
	}

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

import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Event } from "../entities/Event";
import { Media } from "../entities/Media";
import { Vertical } from "../entities/Vertical";
import { CreateVerticalInput, UpdateVerticalInput } from "../inputs/Vertical";
import { GraphQLContext, MediaType } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver()
export class VerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async addVertical(
		@Arg("data") { name, info, imageUrl }: CreateVerticalInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (imageUrl) {
			image = await Media.create({
				url: imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			}).save();
		}
		const vertical = await Vertical.create({
			name,
			info,
			imageId: image?.id,
			updatedById: user.id
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
	async getVerticals(@Info() info: any) {
		const { select, relations } = getSelectAndRelation(info, Vertical);
		return await Vertical.find({ select, relations });
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
			updatedById: user.id
		});
		return affected === 1;
	}

	@FieldResolver()
	async image(@Root() { image, imageId }: Vertical) {
		if (image) return image;
		return Media.findOne(imageId);
	}

	@FieldResolver()
	async events(@Root() { events, id }: Vertical) {
		if (events) return events;
		return Event.find({ where: { verticalId: id } });
	}
}

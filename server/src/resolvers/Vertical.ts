import graphqlFields from "graphql-fields";
import {
	Arg,
	Authorized,
	Ctx,
	Info,
	Mutation,
	Query,
	Resolver
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Media } from "../entities/Media";
import { Vertical } from "../entities/Vertical";
import { CreateVerticalInput, UpdateVerticalInput } from "../inputs/Vertical";
import { MediaRepository } from "../repositories/Media";
import { VerticalRepository } from "../repositories/Vertical";
import { GraphQLContext, MediaType } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class VerticalResolver {
	@InjectRepository()
	private readonly verticalRepo: VerticalRepository;

	@InjectRepository()
	private readonly mediaRepo: MediaRepository;

	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async addVertical(
		@Arg("data") { name, info, imageUrl }: CreateVerticalInput,
		@Ctx() { user }: GraphQLContext
	) {
		let image: Media | undefined;
		if (imageUrl) {
			image = this.mediaRepo.create({
				url: imageUrl,
				uploadedById: user.id,
				type: MediaType.IMAGE
			});
		}

		const vertical = await this.verticalRepo.save({
			name,
			info,
			image,
			updatedById: user.id
		});

		return !!vertical;
	}

	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async deleteVertical(@Arg("id") id: string) {
		const { affected } = await this.verticalRepo.delete(id);
		return !!affected;
	}

	@Authorized()
	@Query(() => [Vertical])
	async getVerticals(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.verticalRepo
		);
		return await this.verticalRepo.find({ select, relations });
	}

	@Authorized("CORE", "HEAD")
	@Mutation(() => Boolean)
	async updateVertical(
		@Arg("data") { name, info, verticalId }: UpdateVerticalInput,
		@Ctx() { user }: GraphQLContext
	) {
		const vertical = await this.verticalRepo.save({
			id: verticalId,
			name,
			info,
			updatedById: user.id
		});
		return !!vertical;
	}
}

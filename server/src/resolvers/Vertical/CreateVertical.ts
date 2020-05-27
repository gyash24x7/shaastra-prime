import { MediaType } from "@prisma/client";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateVerticalInput } from "../../inputs/Vertical/CreateVertical";
import { Vertical } from "../../models/Vertical";
import { defaultImageUrl, GraphQLContext } from "../../utils";

@Resolver()
export class CreateVerticalResolver {
	@Authorized("CORE", "HEAD")
	@Mutation(() => Vertical)
	async addVertical(
		@Arg("data") { name, info, imageUrl }: CreateVerticalInput,
		@Ctx() { user, prisma }: GraphQLContext
	) {
		return await prisma.vertical.create({
			data: {
				name,
				info,
				image: {
					create: {
						url: imageUrl || defaultImageUrl,
						uploadedBy: { connect: { id: user?.id } },
						type: MediaType.IMAGE
					}
				},
				updatedBy: { connect: { id: user!.id } }
			}
		});
	}
}

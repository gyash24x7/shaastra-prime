import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Media } from "../../models/Media";
import { GraphQLContext } from "../../utils";

@Resolver(Media)
export class MediaFieldResolvers {
	@FieldResolver()
	uploadedBy(@Root() { id }: Media, @Ctx() { prisma }: GraphQLContext) {
		return prisma.media.findOne({ where: { id } }).uploadedBy();
	}
}

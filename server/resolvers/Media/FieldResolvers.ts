import { FieldResolver, Resolver, Root } from "type-graphql";
import { Media } from "../../models/Media";
import { prisma } from "../../prisma";

@Resolver(Media)
export class MediaFieldResolvers {
	@FieldResolver()
	uploadedBy(@Root() { id }: Media) {
		return prisma.media.findOne({ where: { id } }).uploadedBy();
	}
}

import { FieldResolver, Resolver, Root } from "type-graphql";
import { Media } from "../entities/Media";
import { User } from "../entities/User";

@Resolver(Media)
export class MediaResolver {
	@FieldResolver()
	async uploadedBy(@Root() { uploadedById, uploadedBy }: Media) {
		if (uploadedBy) return uploadedBy;
		return User.findOne(uploadedById);
	}
}

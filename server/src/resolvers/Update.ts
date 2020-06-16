import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Update } from "../entities/Update";
import { CreateUpdateInput } from "../inputs/Update";
import { GraphQLContext } from "../utils";

@Resolver()
export class UpdateResolver {
	@InjectRepository(Update)
	private readonly updateRepo: Repository<Update>;

	@Authorized()
	@Mutation(() => Boolean)
	async createUpdate(
		@Arg("data") { brief, subject, content }: CreateUpdateInput,
		@Ctx() { user }: GraphQLContext
	) {
		const update = await this.updateRepo.save({
			brief,
			subject,
			content,
			postedById: user.id,
			byDeptId: user.departmentId
		});

		return !!update;
	}

	@Authorized()
	@Query(() => [Update])
	async getUpdates() {
		const updates = await this.updateRepo.find({ order: { id: "DESC" } });
		return updates;
	}
}

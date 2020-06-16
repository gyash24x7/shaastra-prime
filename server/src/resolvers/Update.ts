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
import { Update } from "../entities/Update";
import { CreateUpdateInput } from "../inputs/Update";
import { UpdateRepository } from "../repositories/Update";
import { GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class UpdateResolver {
	@InjectRepository()
	private readonly updateRepo: UpdateRepository;

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
	async getUpdates(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.updateRepo
		);

		const updates = await this.updateRepo.find({
			order: { id: "DESC" },
			select,
			relations
		});
		return updates;
	}
}

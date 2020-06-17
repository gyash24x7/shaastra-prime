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
import { Update } from "../entities/Update";
import { CreateUpdateInput } from "../inputs/Update";
import { GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class UpdateResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createUpdate(
		@Arg("data") { brief, subject, content }: CreateUpdateInput,
		@Ctx() { user }: GraphQLContext
	) {
		const update = await Update.create({
			brief,
			subject,
			content,
			postedById: user.id,
			byDeptId: user.departmentId
		}).save();

		return !!update;
	}

	@Authorized()
	@Query(() => [Update])
	async getUpdates(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			Update
		);

		const updates = await Update.find({
			order: { id: "DESC" },
			relations,
			select
		});
		return updates;
	}
}

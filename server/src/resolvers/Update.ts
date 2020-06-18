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
import { Department } from "../entities/Department";
import { Update } from "../entities/Update";
import { User } from "../entities/User";
import { CreateUpdateInput } from "../inputs/Update";
import { GraphQLContext } from "../utils";
import getSelectAndRelation from "../utils/getSelectAndRelation";

@Resolver(Update)
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
		const { select, relations } = getSelectAndRelation(info, Update);

		const updates = await Update.find({
			order: { id: "DESC" },
			relations,
			select
		});
		return updates;
	}

	@FieldResolver()
	async postedBy(@Root() { postedBy, postedById }: Update) {
		if (postedBy) return postedBy;
		return User.findOne(postedById);
	}

	@FieldResolver()
	async byDept(@Root() { byDept, byDeptId }: Update) {
		if (byDept) return byDept;
		return Department.findOne(byDeptId);
	}
}

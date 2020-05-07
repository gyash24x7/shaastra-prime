import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateUpdateInput } from "../../inputs/Update/CreateUpdate";
import { prisma } from "../../prisma";
import { GraphQLContext } from "../../utils";

@Resolver()
export class CreateUpdateResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createUpdate(
		@Arg("data") { brief, subject, content }: CreateUpdateInput,
		@Ctx() { req }: GraphQLContext
	) {
		const id = req.session!.userId;
		const user = await prisma.user.findOne({ where: { id } });

		const update = await prisma.update.create({
			data: {
				brief,
				subject,
				content,
				postedBy: { connect: { id } },
				byDept: { connect: { id: user?.deptId } }
			}
		});

		return !!update;
	}
}

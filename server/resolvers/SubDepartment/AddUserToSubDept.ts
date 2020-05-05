import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { AddUserToSubDeptInput } from "../../inputs/SubDepartment/AddUserToSubDept";
import { prisma } from "../../prisma";

@Resolver()
export class AddUserToSubDeptResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async addMemberToSubDept(
		@Arg("data") { subDept, members }: AddUserToSubDeptInput
	) {
		const subDepartment = await prisma.subDepartment
			.update({
				where: { id: subDept },
				data: { members: { connect: members.map((id) => ({ id })) } }
			})
			.catch((err) => {
				console.log("Error Adding Members to Sub Department!");
				throw new Error(err);
			});

		prisma.channel
			.update({
				where: { name: subDepartment.name },
				data: { members: { connect: members.map((id) => ({ id })) } }
			})
			.then(() => {
				console.log("Newly added member added to Sub Department Channel!");
			})
			.catch((err) => {
				console.log("Unable to add member to Sub Department Channel!");
				throw new Error(err);
			});

		return !!subDepartment;
	}
}

import cuid from "cuid";
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
import { Department } from "../entities/Department";
import { User } from "../entities/User";
import { AssignFinManagerInput, GrantAccessInput } from "../inputs/Department";
import { DepartmentRepository } from "../repositories/Department";
import { UserRepository } from "../repositories/User";
import { GraphQLContext } from "../utils";
import getSelectionAndRelation from "../utils/getSelectionAndRelation";

@Resolver()
export class DepartmentResolver {
	@InjectRepository()
	private readonly deptRepo: DepartmentRepository;

	@InjectRepository()
	private readonly userRepo: UserRepository;

	@Authorized(["CORE"])
	@Mutation(() => Boolean)
	async addSubDepartment(
		@Arg("subDept") subDept: string,
		@Ctx() { user }: GraphQLContext
	) {
		let dept = await this.deptRepo.findOneOrFail(user.departmentId, {
			select: ["subDepartments", "id"]
		});
		dept.subDepartments.push(subDept);
		dept = await this.deptRepo.save(dept);

		return !!dept;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async assignFinManager(
		@Arg("data") { userId, deptId }: AssignFinManagerInput
	) {
		const dept = await this.deptRepo.save({
			id: deptId,
			finManagerId: userId
		});

		return !!dept;
	}

	@Mutation(() => Boolean)
	async createDepartment(@Arg("name") name: string) {
		const dept = await this.deptRepo.save({ name, id: cuid() });
		return !!dept;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async deleteMember(@Arg("userId") userId: string) {
		const { affected } = await this.userRepo.delete(userId);
		return !!affected;
	}

	@Query(() => [Department])
	async getDepartments(@Info() info: any) {
		const { select, relations } = getSelectionAndRelation(
			graphqlFields(info),
			this.deptRepo
		);
		const depts = await this.deptRepo.find({ select, relations });
		return depts.filter(({ name }) => name !== "ADMIN");
	}

	@Authorized()
	@Query(() => [User])
	async getDeptMembers(@Arg("deptId") deptId: string) {
		const dept = await this.deptRepo.findOneOrFail(deptId, {
			relations: ["members"]
		});
		return dept.members;
	}

	@Authorized("CORE")
	@Mutation(() => Boolean)
	async grantAccess(@Arg("data") { userId, role }: GrantAccessInput) {
		const user = await this.userRepo.save({ role, id: userId });
		return !!user;
	}
}

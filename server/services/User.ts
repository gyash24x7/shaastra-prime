import { Service } from "feathers-memory";
import { Application } from "../types";
import userHooks from "../hooks/user";
import { UserCreateInput, UserUpdateInput } from "../../prisma/generated";
import { prisma } from "../../prisma";

export class UserService extends Service {
	constructor(app: Application) {
		super();
		console.log(app.get("public"));
	}

	async find() {
		return prisma.users();
	}

	async get(id: string) {
		return prisma.user({ id });
	}

	async create(data: UserCreateInput) {
		return prisma.createUser(data);
	}

	async update(id: string, data: UserUpdateInput) {
		return prisma.updateUser({ where: { id }, data });
	}

	async remove(id: string) {
		return prisma.deleteUser({ id });
	}
}

export default (app: Application) => {
	app.use("/users", new UserService(app));
	const service = app.service("users");
	service.hooks(userHooks);
};

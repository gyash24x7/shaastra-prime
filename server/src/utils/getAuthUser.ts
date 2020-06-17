import { Request } from "express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";

interface AuthParams {
	req: Request;
	connection?: ExecutionParams;
	userRepo: UserRepository;
}

export const getAuthUser = async ({
	req,
	connection,
	userRepo
}: AuthParams) => {
	const header: string = !!req
		? req.headers.authorization
		: connection!.context.Authorization;

	let user: User | undefined;

	if (!!header) {
		const token: string = header.split(" ")[1];

		if (!!token) {
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
			user = await userRepo.findOne(decoded.id, { relations: ["department"] });
		}
	}
	return user;
};

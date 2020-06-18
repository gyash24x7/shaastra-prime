import dotenv from "dotenv";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";
import { User } from "../entities/User";
dotenv.config();

interface AuthParams {
	req: Request;
	connection?: ExecutionParams;
}

export const getAuthUser = async ({ req, connection }: AuthParams) => {
	const header: string = !!req
		? req.headers.authorization
		: connection!.context.Authorization;

	let user: User | undefined;

	if (!!header) {
		const token: string = header.split(" ")[1];

		if (!!token) {
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
			user = await User.findOne(decoded.id, { relations: ["department"] });
		}
	}
	return user;
};

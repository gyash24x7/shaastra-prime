import { Request } from "express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";
import { EntityManager } from "typeorm";
import { User } from "../models/User";

interface AuthParams {
	req: Request;
	connection?: ExecutionParams;
	db: EntityManager;
}

export const getAuthUser = async ({ req, connection, db }: AuthParams) => {
	const header: string = !!req
		? req.headers.authorization
		: connection!.context.Authorization;

	let user: (User & { id: string; name: string }) | undefined;

	if (!!header) {
		const token: string = header.split(" ")[1];

		if (!!token) {
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
			user = await db.findOne(User, decoded.id, { relations: ["department"] });
		}
	}
	return user;
};

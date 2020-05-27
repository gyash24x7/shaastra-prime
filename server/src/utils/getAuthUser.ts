import { Department, PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { ExecutionParams } from "subscriptions-transport-ws";

interface AuthParams {
	req: Request;
	connection?: ExecutionParams;
	prisma: PrismaClient;
}

export const getAuthUser = async ({ req, connection, prisma }: AuthParams) => {
	const header: string = !!req
		? req.headers.authorization
		: connection!.context.Authorization;

	let user: (User & { department: Department }) | null = null;

	if (!!header) {
		const token: string = header.split(" ")[1];

		if (!!token) {
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
			user = await prisma.user.findOne({
				where: { id: decoded.id },
				include: { department: true }
			});
		}
	}
	return user;
};

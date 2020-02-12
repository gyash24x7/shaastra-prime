import { Request, Response } from "express";

export enum UserRole {
	COORD = "COORD",
	HEAD = "HEAD",
	CORE = "CORE",
	COCAS = "COCAS",
	COCAD = "COCAD"
}

export interface GraphQLContext {
	req: Request;
	res: Response;
}

export enum MessageStatus {
	NOT_SENT = "NOT_SENT",
	SENT = "SENT",
	DELIVERED = "DELIVERED",
	RECEIVED = "RECEIVED",
	READ = "READ"
}

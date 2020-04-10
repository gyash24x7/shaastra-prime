import { Request, Response } from "express";
import { Stream } from "stream";

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

export enum MediaType {
	IMAGE = "IMAGE",
	AUDIO = "AUDIO",
	VIDEO = "VIDEO",
	DOC = "DOC",
	CODE = "CODE"
}

export enum ReactionType {
	LOVE = "LOVE",
	LIKE = "LIKE",
	HAHA = "HAHA",
	ANGRY = "ANGRY",
	SAD = "SAD"
}

export enum TaskStatus {
	COORD = "COORD",
	HEAD = "HEAD",
	CORE = "CORE",
	COCAS = "COCAS",
	COCAD = "COCAD"
}

export interface Upload {
	filename: string;
	mimetype: string;
	encoding: string;
	createReadStream: () => Stream;
}

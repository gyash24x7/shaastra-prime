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

export enum MilestoneStatus {
	IN_PROGRESS = "IN_PROGRESS",
	ACHIEVED = "ACHIEVED"
}

export enum GoalType {
	WEEKLY = "WEEKLY",
	BI_WEEKLY = "BI_WEEKLY",
	MONTHLY = "MONTHLY",
	END_GOAL = "END_GOAL"
}

export enum SprintStatus {
	NOT_STARTED = "NOT_STARTED",
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED"
}

export enum InvoiceActivityType {
	UPLOADED = "UPLOADED",
	EDITED = "EDITED",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED"
}

export enum InvoiceType {
	REIMBURSEMENT = "REIMBURSEMENT",
	SETTLEMENT = "SETTLEMENT",
	DIRECT_PAYMENT = "DIRECT_PAYMENT"
}

export enum InvoiceStatus {
	COORD = "COORD",
	HEAD = "HEAD",
	CORE = "CORE",
	FIN_MANAGER = "FIN_MANAGER",
	FIN_CORE = "FIN_CORE",
	COCAD = "COCAD"
}

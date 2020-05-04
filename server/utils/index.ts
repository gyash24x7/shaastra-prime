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
	NOT_ASSIGNED = "NOT_ASSIGNED",
	ASSIGNED = "ASSIGNED",
	IN_PROGRESS = "IN_PROGRESS",
	SUBMITTED = "SUBMITTED",
	COMPLETED = "COMPLETED"
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

export enum SubTaskStatus {
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

export enum ChannelType {
	GROUP = "GROUP",
	DIRECT = "DIRECT"
}

export enum TaskActivityType {
	NOT_ASSIGNED = "NOT_ASSIGNED",
	ASSIGNED = "ASSIGNED",
	IN_PROGRESS = "IN_PROGRESS",
	SUBMITTED = "SUBMITTED",
	COMPLETED = "COMPLETED"
}

export enum MessageType {
	SYSTEM = "SYSTEM",
	TEXT = "TEXT",
	MEDIA = "MEDIA",
	TASK_ACTIVITY = "TASK_ACTIVITY",
	INVOICE_ACTIVITY = "INVOICE_ACTIVITY"
}

import { Stream } from "stream";
import { PubSubEngine } from "type-graphql";
import { Channel } from "../entities/Channel";
import { User } from "../entities/User";

export interface SendMailOptions {
	rollNumber: string;
	name: string;
	subject: string;
	htmlPart: string;
}

export interface MessagePubsubOptions {
	pubsub: PubSubEngine;
	channels: Channel[];
}

export interface TaskSaveOptionsData {
	user: User;
	pubsub: PubSubEngine;
	type: TaskActivityType;
}

export interface ChannelSaveOptionsData {
	user: User;
	pubsub: PubSubEngine;
	content: string;
}

export enum UserRole {
	COORD = "COORD",
	HEAD = "HEAD",
	CORE = "CORE",
	COCAS = "COCAS",
	COCAD = "COCAD"
}

export interface GraphQLContext {
	user: User;
}

export enum MediaType {
	IMAGE = "IMAGE",
	AUDIO = "AUDIO",
	VIDEO = "VIDEO",
	DOC = "DOC"
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

export enum InvoiceActivityType {
	UPLOADED = "UPLOADED",
	EDITED = "EDITED",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	CONNECT_CHANNEL = "CONNECT_CHANNEL"
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
	COCAD = "COCAD",
	REJECTED = "REJECTED"
}

export enum ChannelType {
	GROUP = "GROUP",
	DIRECT = "DIRECT"
}

export enum TaskActivityType {
	CREATED = "CREATED",
	ASSIGNED = "ASSIGNED",
	IN_PROGRESS = "IN_PROGRESS",
	SUBMITTED = "SUBMITTED",
	COMPLETED = "COMPLETED",
	CONNECT_CHANNEL = "CONNECT_CHANNEL",
	ATTACH_MEDIA = "ATTACH_MEDIA",
	DELETED = "DELETED"
}

export enum MessageType {
	SYSTEM = "SYSTEM",
	TEXT = "TEXT",
	MEDIA = "MEDIA",
	TASK_ACTIVITY = "TASK_ACTIVITY",
	INVOICE_ACTIVITY = "INVOICE_ACTIVITY"
}

export const getMediaType = (type: string) => {
	switch (type) {
		case "IMAGE":
			return MediaType.IMAGE;
		case "AUDIO":
			return MediaType.AUDIO;
		case "VIDEO":
			return MediaType.VIDEO;
		default:
			return MediaType.DOC;
	}
};

export const getChannelType = (type: string) => {
	return type === "DIRECT" ? ChannelType.DIRECT : ChannelType.GROUP;
};

export enum RegistrationType {
	INDIVIDUAL = "INDIVIDUAL",
	TEAM = "TEAM",
	BOTH = "BOTH"
}

export enum InviteStatus {
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
	PENDING = "PENDING"
}

export const defaultImageUrl = "https://source.unsplash.com/featured/500x500";

export const APPROVAL_STAGES = [
	"COORD",
	"HEAD",
	"CORE",
	"FIN_MANAGER",
	"FIN_CORE",
	"COCAD"
];

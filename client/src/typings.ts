import { Map, List } from "immutable";

export type User = {
	rollNumber: string;
	name: string;
	accessLevel: string;
	department: string;
};

export type Channel = {
	id: string;
	name: string;
	members: User[];
};

export interface ChannelAction {
	id: string;
	name: string;
	members: User[];
	type: string;
}

export type Department = {
	id: string;
	name: string;
	members: User[];
};

export type DepartmentAction = {
	type: string;
};

export type Store = {
	user: User;
	departments: Department[];
	channels: Channel[];
};

export type UserAction = {
	type: string;
};

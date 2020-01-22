export interface User {
	rollNumber: string;
	name: string;
	accessLevel: string;
	department: string;
}

export interface Channel {
	id: string;
	name: string;
	members: User[];
	messages: Message[]
}

export interface Message {
	id: string;
	content: string;
	by: User;
}

export interface ChannelAction {
	id: string;
	name: string;
	members: User[];
	type: string;
}

export interface Department {
	id: string;
	name: string;
	members: User[];
}

export interface DepartmentAction {
	type: string;
}

export interface Store {
	user: User;
	departments: Department[];
	channels: Channel[];
}

export interface UserAction {
	type: string;
}

export interface LoginAction {
	type: string;
	rollNumber: string;
	password: string;
}

export interface LoginActionData {
	rollNumber: string;
	password: string;
}

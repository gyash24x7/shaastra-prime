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
}

export interface ChannelAction {
	id: string;
	name: string;
	members: User[];
	type: string;
}

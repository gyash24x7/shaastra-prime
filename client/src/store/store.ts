import { Channel, Department, User } from "../typings";

export const user: User = {
	rollNumber : "CH16B025",
	name : "Yash Gupta",
	department : "WEBOPS",
	accessLevel : "CORE"
};

export const channels: Channel[] = [
	{
		id : "1",
		name : "Core Team",
		members : [
			{
				rollNumber : "CH16B025",
				name : "Yash Gupta",
				department : "WEBOPS",
				accessLevel : "CORE"
			},
			{
				rollNumber : "CH16B026",
				name : "Abhinav Kankane",
				department : "WEBOPS",
				accessLevel : "CORE"
			},
			{
				rollNumber : "CH16B022",
				name : "Swarnav Das",
				department : "WEBOPS",
				accessLevel : "CORE"
			},
			{
				rollNumber : "CH16B023",
				name : "Vijaybharathi Murugan",
				department : "WEBOPS",
				accessLevel : "CORE"
			}
		]
	}
];

export const departments: Department[] = [
	{
		id : "1",
		name : "WEBOPS",
		members : []
	},
	{
		id : "2",
		name : "PUBLICITY",
		members : []
	}
];

export const initialStore = {
	user,
	channels,
	departments
};

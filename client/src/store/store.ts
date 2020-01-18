import { Channel } from "../typings";
import { Map, List } from "immutable";

let user = Map({
	rollNumber: "CH16B025",
	name: "Yash Gupta",
	department: "WEBOPS",
	accessLevel: "CORE"
});

let channels = List<Channel>([
	{
		id: "1",
		name: "Core Team",
		members: List([
			{
				rollNumber: "CH16B025",
				name: "Yash Gupta",
				department: "WEBOPS",
				accessLevel: "CORE"
			},
			{
				rollNumber: "CH16B026",
				name: "Abhinav Kankane",
				department: "WEBOPS",
				accessLevel: "CORE"
			},
			{
				rollNumber: "CH16B022",
				name: "Swarnav Das",
				department: "WEBOPS",
				accessLevel: "CORE"
			},
			{
				rollNumber: "CH16B023",
				name: "Vijaybharathi Murugan",
				department: "WEBOPS",
				accessLevel: "CORE"
			}
		])
	}
]);

export const initialStore = { user, channels };

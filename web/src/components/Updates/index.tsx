import { Card, Pagination, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import { PrivateLayout } from "../shared/PrivateLayout";
import { UpdateListItem } from "./UpdateListItem";

const { Title } = Typography;
const { Option } = Select;

export const UpdateScreen = () => {
	const [filterDepartment, setFilterDepartment] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<PrivateLayout>
			<Card
				title={<Title level={3}>Updates</Title>}
				extra={
					<Space size="small">
						<Select
							placeholder="Filter by Department"
							onSelect={(val) => setFilterDepartment(val.toString())}
						>
							<Option value="WebOps">WebOps</Option>
						</Select>
						<Pagination
							total={updateList.length}
							current={currentPage}
							onChange={setCurrentPage}
						/>
					</Space>
				}
			>
				{updateList
					.filter(({ byDept }) =>
						filterDepartment ? byDept === filterDepartment : true
					)
					.map((update, i) => (
						<Card.Grid style={{ width: "100%" }} key={i}>
							<UpdateListItem update={update} />
						</Card.Grid>
					))}
			</Card>
		</PrivateLayout>
	);
};

const updateList = [
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "O & IP", postedBy: "Yash Gupta" },
	{ byDept: "Spons", postedBy: "Yash Gupta" },
	{ byDept: "S & E", postedBy: "Yash Gupta" },
	{ byDept: "Evolve", postedBy: "Yash Gupta" },
	{ byDept: "Envisage", postedBy: "Yash Gupta" },
	{ byDept: "E & W", postedBy: "Yash Gupta" },
	{ byDept: "C & D", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" },
	{ byDept: "WebOps", postedBy: "Yash Gupta" }
];

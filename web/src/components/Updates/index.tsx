import { Card, Pagination, Select, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import { useGetUpdatesQuery } from "../../generated";
import { DepartmentContext } from "../../utils/context";
import { Loader } from "../shared/Loader";
import { NoData } from "../shared/NoData";
import { ShowError } from "../shared/ShowError";
import { UpdateListItem } from "./UpdateListItem";

const { Title } = Typography;
const { Option } = Select;

export const UpdateScreen = () => {
	const [filterDepartment, setFilterDepartment] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const { departments } = useContext(DepartmentContext);

	const { data, error, loading } = useGetUpdatesQuery();

	if (error) {
		return <ShowError />;
	}
	return (
		<Card
			title={<Title level={3}>Updates</Title>}
			extra={
				<Space size="small">
					<Select
						placeholder="Filter by Department"
						onSelect={(val) => setFilterDepartment(val.toString())}
					>
						{departments.map((dept) => (
							<Option value={dept.id} key={dept.id}>
								{dept.name}
							</Option>
						))}
					</Select>
					<Pagination
						total={data?.getUpdates.length}
						current={currentPage}
						onChange={setCurrentPage}
					/>
				</Space>
			}
		>
			{data?.getUpdates
				.filter(({ byDept }) =>
					filterDepartment ? byDept.name === filterDepartment : true
				)
				.map((update, i) => (
					<Card.Grid style={{ width: "100%" }} key={i}>
						<UpdateListItem update={update} />
					</Card.Grid>
				))}
			{data?.getUpdates.filter(({ byDept }) =>
				filterDepartment ? byDept.name === filterDepartment : true
			).length === 0 && <NoData />}
			{loading && <Loader />}
		</Card>
	);
};

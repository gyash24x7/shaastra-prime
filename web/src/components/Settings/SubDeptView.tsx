import { Card, Typography } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../utils/context";

const { Title, Text } = Typography;

export const SubDeptView = () => {
	const { user } = useContext(UserContext)!;

	return (
		<Card title={<Title level={3}>Sub Departments</Title>}>
			{user.department?.subDepartments?.length === 0 && (
				<Card.Grid style={{ width: "100%", textAlign: "center" }}>
					<Text strong>No Sub Department Created</Text>
				</Card.Grid>
			)}
			{user.department?.subDepartments?.map((subDept) => (
				<Card.Grid
					key={subDept}
					style={{ textAlign: "center", width: "25%" }}
					hoverable={false}
				>
					<Title level={4}>{subDept}</Title>
				</Card.Grid>
			))}
		</Card>
	);
};

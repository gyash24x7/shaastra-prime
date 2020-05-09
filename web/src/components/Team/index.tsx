import { Card, Typography } from "antd";
import React, { useContext, useState } from "react";
import { DepartmentContext } from "../../utils/context";
import { TeamComponent } from "./TeamComponent";

const { Title, Text } = Typography;

export const TeamScreen = () => {
	const { departments } = useContext(DepartmentContext);

	const [activeDept, setActiveDept] = useState(departments[0].id);

	return (
		<Card
			title={<Title level={3}>Team Shaastra</Title>}
			tabList={departments.map((dept) => ({
				tab: (
					<div className="tab-title">
						<Text strong>{dept.shortName}</Text>
					</div>
				),
				key: dept.id
			}))}
			tabBarExtraContent={<div></div>}
			onTabChange={(tab) => setActiveDept(tab)}
			className="team-card card-with-tabs "
		>
			<TeamComponent deptId={activeDept} />
		</Card>
	);
};

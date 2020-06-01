import { Button, Descriptions, Space, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { statusColor } from ".";
import { UserContext } from "../../utils/context";
import { UserCardSmall } from "../shared/UserCardSmall";

const { Text } = Typography;

export const TaskDescription = ({ data }: any) => {
	const { user } = useContext(UserContext);

	return (
		<Descriptions column={2} bordered layout="horizontal">
			<Descriptions.Item label={<Text>Details</Text>} span={2}>
				<Text strong>{data.details}</Text>
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Deadline</Text>}>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item label={<Text>By&nbsp;Department</Text>}>
				<Text strong>{data.byDept}</Text>
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Created&nbsp;On</Text>}>
				{data.createdAt.format("DD MMMM")}
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Status</Text>}>
				<Tag color={statusColor[data.status]}>{data.status}</Tag>
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Assigned&nbsp;To</Text>} span={2}>
				<Space size="large">
					{data.assignedTo.map((_: any, i: number) => (
						<UserCardSmall key={i} user={user} />
					))}
				</Space>
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Created&nbsp;By</Text>} span={2}>
				<Space>
					<UserCardSmall user={user} />
				</Space>
			</Descriptions.Item>
			<Descriptions.Item label={<Text>Actions</Text>}>
				<Space>
					<Button className="button">Assign Task</Button>
					<Button className="button">Submit Task</Button>
					<Button className="button" type="primary">
						Mark As Completed
					</Button>
					<Button className="button" danger>
						Delete Task
					</Button>
					<Button className="button default">View Conversation</Button>
				</Space>
			</Descriptions.Item>
		</Descriptions>
	);
};

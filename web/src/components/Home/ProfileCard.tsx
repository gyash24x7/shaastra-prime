import { Card, List, Typography } from "antd";
import React from "react";
import { UserCard } from "../shared/UserCard";

const { Text, Paragraph } = Typography;

export const ProfileCard = () => {
	return (
		<Card
			className="profile-card"
			cover={<img alt="" src="https://source.unsplash.com/featured/500x350" />}
		>
			<UserCard withAvatar avatarSize={100} />
			<br />
			<List
				itemLayout="horizontal"
				dataSource={[
					{ label: "Mobile", value: "7388378834" },
					{ label: "Email", value: "gyash@shaastra.org" },
					{ label: "Roll Number", value: "CH16B025" },
					{ label: "UPI", value: "gyash24x7@okaxis" }
				]}
				renderItem={(item) => (
					<List.Item>
						<Text strong>{item.label}</Text>
						<Paragraph>{item.value}</Paragraph>
					</List.Item>
				)}
			/>
		</Card>
	);
};

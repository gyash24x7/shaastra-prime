import { Card, List, Typography } from "antd";
import React from "react";
import { useGetUserQuery } from "../../generated";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";
import { UserCard } from "../shared/UserCard";

const { Text, Paragraph } = Typography;

interface ProfileCardProps {
	userId: string;
}

export const ProfileCard = ({ userId }: ProfileCardProps) => {
	const { data, error } = useGetUserQuery({ variables: { userId } });

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data && data.getUser) {
		return (
			<Card
				className="profile-card"
				cover={
					<img alt="" src="https://source.unsplash.com/featured/500x350" />
				}
			>
				<UserCard withAvatar avatarSize={100} user={data.getUser} />
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
	}

	return <Loader />;
};

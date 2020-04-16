import { Button, Descriptions, Typography } from "antd";
import React from "react";

import { stringGen } from "../../utils/lorem";

const { Title, Paragraph } = Typography;
const { Item: DescriptionItem } = Descriptions;

export const UserDetails = () => {
	return (
		<Descriptions layout="vertical" bordered column={2}>
			<DescriptionItem label={<Title level={4}>About</Title>} span={2}>
				<Paragraph>{stringGen.generateSentences(3)}</Paragraph>
			</DescriptionItem>
			<DescriptionItem label={<Title level={4}>Email</Title>}>
				<Paragraph>abcxyz@shaastra.org</Paragraph>
			</DescriptionItem>
			<DescriptionItem label={<Title level={4}>Roll Number</Title>}>
				<Paragraph>CH16B025</Paragraph>
			</DescriptionItem>
			<DescriptionItem label={<Title level={4}>Mobile</Title>}>
				<Paragraph>+91 1234 567 890</Paragraph>
			</DescriptionItem>
			<DescriptionItem label={<Title level={4}>Upi</Title>}>
				<Paragraph>abcd123@okbank</Paragraph>
			</DescriptionItem>
			<DescriptionItem label={<Title level={4}>Actions</Title>}>
				<div className="grid-row">
					<Button className="button default">Edit Profile</Button>
				</div>
			</DescriptionItem>
		</Descriptions>
	);
};

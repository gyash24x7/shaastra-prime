import { ClockCircleFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import React, { Fragment } from "react";

import { stringGen } from "../../utils/lorem";

const { Paragraph } = Typography;

export const UpdateItem = () => {
	return (
		<Card
			title={stringGen.generateWords(2)}
			hoverable
			className="update-item"
			extra={
				<Fragment>
					<Tag color="red">WebOps</Tag>
					<Tag color="cyan">Yash Gupta</Tag>
					<Tag icon={<ClockCircleFilled />} color="lime">
						6 Days Ago
					</Tag>
				</Fragment>
			}
		>
			<Paragraph>{stringGen.generateParagraphs(1)}</Paragraph>
			<Paragraph>{stringGen.generateParagraphs(1)}</Paragraph>
			<Paragraph>{stringGen.generateParagraphs(1)}</Paragraph>
		</Card>
	);
};

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
					<Tag color="#0052cc">WebOps</Tag>
					<Tag color="#de350b">Yash</Tag>
					<Tag icon={<ClockCircleFilled />} color="#172b4d">
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

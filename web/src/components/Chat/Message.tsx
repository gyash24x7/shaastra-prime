import { ClockCircleFilled, LikeFilled } from "@ant-design/icons";
import { Comment, Space, Tag, Typography } from "antd";
import React from "react";
import { stringGen } from "../../utils/lorem";

const { Text } = Typography;

export const Message = () => {
	return (
		<div className="message-box">
			<Comment
				content={
					<div className="message-content">
						{stringGen.generateSentences(4)}
					</div>
				}
				author={
					<div className="sender-name">
						<Tag color="cyan">
							<Text strong>{stringGen.generateWords(2)}</Text>
						</Tag>
					</div>
				}
				datetime={
					<Space>
						<Tag color="lime" icon={<ClockCircleFilled />}>
							<Text>12:30</Text>
						</Tag>
						<Tag color="pink" icon={<LikeFilled />}>
							<Text>12</Text>
						</Tag>
					</Space>
				}
			/>
		</div>
	);
};

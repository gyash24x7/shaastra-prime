import { Tag, Typography } from "antd";
import React from "react";

import { stringGen } from "../../utils/lorem";

interface MessageProps {
	isYour?: boolean;
}

const { Text } = Typography;

export const MessageComponent = ({ isYour }: MessageProps) => {
	return (
		<div
			className="message-alignment-box"
			style={{ justifyContent: isYour ? "flex-end" : "flex-start" }}
		>
			<div className="message-box">
				<div className="message-details">
					<div className="sender-name">
						<Tag color="cyan">
							<Text strong>{stringGen.generateWords(2)}</Text>
						</Tag>
					</div>
					<div className="message-content">
						{stringGen.generateSentences(4)}
					</div>
				</div>
			</div>
		</div>
	);
};

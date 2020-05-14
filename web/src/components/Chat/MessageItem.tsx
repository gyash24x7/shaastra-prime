import { ClockCircleFilled, LikeFilled } from "@ant-design/icons";
import { Comment, Space, Tag } from "antd";
import moment from "moment";
import React from "react";
import { Message } from "../../generated";

interface MessageItemProps {
	message: Partial<Message>;
}

export const MessageItem = ({ message }: MessageItemProps) => {
	return (
		<div className="message-box">
			<Comment
				content={
					<div
						className="message-content"
						dangerouslySetInnerHTML={{ __html: message.content! }}
					/>
				}
				author={
					<Tag color="cyan" className="sender-name">
						{message.createdBy?.name}
					</Tag>
				}
				datetime={
					<Space>
						<Tag color="lime" icon={<ClockCircleFilled />}>
							{moment(parseInt(message.createdAt!)).format("hh:mm A")}
						</Tag>
						<Tag color="pink" icon={<LikeFilled />}>
							{message.likes}
						</Tag>
					</Space>
				}
			/>
		</div>
	);
};

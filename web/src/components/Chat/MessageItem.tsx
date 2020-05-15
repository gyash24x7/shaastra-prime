import {
	ClockCircleFilled,
	LikeFilled,
	StarFilled,
	StarOutlined
} from "@ant-design/icons";
import { Avatar, Comment, Space } from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { Message } from "../../generated";

interface MessageItemProps {
	message: Partial<Message>;
}

export const MessageItem = ({ message }: MessageItemProps) => {
	return (
		<div className="message-box">
			<Comment
				avatar={<Avatar src="https://source.unsplash.com/featured" />}
				content={
					<div
						className="message-content"
						dangerouslySetInnerHTML={{ __html: message.content! }}
					/>
				}
				datetime={
					<Fragment>
						<div className="sender-name">{message.createdBy?.name}</div>
						<Space size="middle">
							<Space>
								<ClockCircleFilled />
								{moment(parseInt(message.createdAt!)).format("hh:mm A")}
							</Space>
							<Space>
								{message.starred ? <StarFilled /> : <StarOutlined />}
							</Space>
							<Space>
								<LikeFilled />
								{message.likes}
							</Space>
						</Space>
					</Fragment>
				}
			/>
		</div>
	);
};

import { ClockCircleFilled, StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Comment, Space } from "antd";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import moment from "moment";
import React, { Fragment } from "react";
import { Message, MessageType } from "../../generated";
import { RecursivePartial } from "../../generated/types";

interface MessageItemProps {
	message: RecursivePartial<Message>;
}

export const TextMessage = ({ message }: MessageItemProps) => {
	return (
		<div className="message-box">
			<Comment
				avatar={<Avatar src="https://source.unsplash.com/featured/100x100" />}
				content={
					<div className="message-content">
						<Editor
							onChange={() => {}}
							editorState={EditorState.createWithContent(
								convertFromRaw(JSON.parse(message.content!))
							)}
							readOnly
						/>
					</div>
				}
				datetime={
					<Fragment>
						<div className="sender-name">{message.createdBy?.name}</div>
						<Space size="middle">
							<Space>
								<ClockCircleFilled />
								{moment(parseInt(message.createdOn!)).format("hh:mm A")}
							</Space>
							<Space>
								{message.starred ? <StarFilled /> : <StarOutlined />}
							</Space>
						</Space>
					</Fragment>
				}
			/>
		</div>
	);
};

export const TaskUpdateMessage = ({ message }: MessageItemProps) => {
	return <div className="message-box">{message.content}</div>;
};

export const MediaMessage = ({ message }: MessageItemProps) => {
	return <div className="message-box">{message.content}</div>;
};

export const MessageItem = ({ message }: MessageItemProps) => {
	switch (message.type) {
		case MessageType.Text:
			return <TextMessage message={message} />;
		default:
			return <TaskUpdateMessage message={message} />;
	}
};

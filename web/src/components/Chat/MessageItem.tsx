import {
	ClockCircleFilled,
	LikeFilled,
	LikeOutlined,
	StarFilled,
	StarOutlined
} from "@ant-design/icons";
import { Avatar, Comment, Space } from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { Message, MessageType } from "../../generated";

interface MessageItemProps {
	message: Partial<Message>;
}

export const MessageItem = ({ message }: MessageItemProps) => {
	return (
		<div className="message-box">
			<Comment
				avatar={<Avatar src="https://source.unsplash.com/featured/100x100" />}
				content={
					message.type === MessageType.Media ? (
						<div className="image-content-wrapper">
							{message.media?.map((image) => (
								<div
									className="image-content"
									onClick={() => window.open(image.url, "_blank")}
								>
									<img src={image.url} alt="" />
								</div>
							))}
							{message.media?.map((image) => (
								<div
									className="image-content"
									onClick={() => window.open(image.url, "_blank")}
								>
									<img src={image.url} alt="" />
								</div>
							))}
						</div>
					) : (
						<div
							className="message-content"
							dangerouslySetInnerHTML={{ __html: message.content! }}
						/>
					)
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
								{message.liked ? <LikeFilled /> : <LikeOutlined />}
								{message.likes}
							</Space>
						</Space>
					</Fragment>
				}
			/>
		</div>
	);
};

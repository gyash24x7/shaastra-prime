import { ClockCircleFilled, LikeFilled } from "@ant-design/icons";
import { Comment, Space, Tag } from "antd";
import React from "react";

export const Message = (props: any) => {
	return (
		<div className="message-box">
			<Comment
				content={<div className="message-content">{props.message.content}</div>}
				author={<Tag color="cyan">{props.message.by}</Tag>}
				datetime={
					<Space>
						<Tag color="lime" icon={<ClockCircleFilled />}>
							{props.message.createdAt}
						</Tag>
						<Tag color="pink" icon={<LikeFilled />}>
							{props.message.likes}
						</Tag>
					</Space>
				}
			/>
		</div>
	);
};

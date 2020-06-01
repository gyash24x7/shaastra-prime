import { ClockCircleFilled } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import moment from "moment";
import React, { useContext } from "react";
import { Update } from "../../generated";
import { DrawerContext } from "../../utils/context";
import { composedDecorator } from "../Editor";

const { Text, Paragraph } = Typography;

interface UpdateListItemProps {
	update: Partial<Update>;
}

export const UpdateListItem = ({ update }: UpdateListItemProps) => {
	const { toggleDrawer } = useContext(DrawerContext)!;

	return (
		<div
			className="update-list-item"
			onClick={() => {
				toggleDrawer({
					props: {
						title: update.subject,
						extra: (
							<Space size={0} style={{ marginTop: 10 }}>
								<Tag color="red">{update.byDept?.name}</Tag>
								<Tag color="cyan">{update.postedBy?.name}</Tag>
								<Tag icon={<ClockCircleFilled />} color="lime">
									{moment(parseInt(update.createdAt!)).fromNow()}
								</Tag>
							</Space>
						)
					},
					component: (
						<Editor
							editorState={EditorState.createWithContent(
								convertFromRaw(JSON.parse(update.content!)),
								composedDecorator
							)}
							onChange={() => {}}
							readOnly
						/>
					)
				});
			}}
		>
			<div className="update-brief">
				<Text strong>{update.subject}</Text>
				<Paragraph>{update.brief}</Paragraph>
			</div>
			<div className="update-actions">
				<Tag color="red">{update.byDept?.name}</Tag>
				<Tag color="cyan">{update.postedBy?.name}</Tag>
				<Tag icon={<ClockCircleFilled />} color="lime">
					{moment(parseInt(update.createdAt!)).fromNow()}
				</Tag>
			</div>
		</div>
	);
};

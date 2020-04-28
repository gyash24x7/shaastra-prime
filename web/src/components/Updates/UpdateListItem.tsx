import { ClockCircleFilled } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import React, { useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { stringGen } from "../../utils/lorem";
import { UpdateItem } from "./UpdateItem";

const { Text, Paragraph } = Typography;

interface UpdateListItemProps {
	update: { byDept: string; postedBy: string };
}

export const UpdateListItem = ({ update }: UpdateListItemProps) => {
	const { setDrawerComponent } = useContext(DrawerContext)!;

	return (
		<div
			className="update-list-item"
			onClick={() => setDrawerComponent!(<UpdateItem />)}
		>
			<div className="update-brief">
				<Text strong>{stringGen.generateWords(4)}</Text>
				<Paragraph>{stringGen.generateSentences(2)}</Paragraph>
			</div>
			<div className="update-actions">
				<Tag color="red">{update.byDept}</Tag>
				<Tag color="cyan">Yash Gupta</Tag>
				<Tag icon={<ClockCircleFilled />} color="lime">
					6 Days Ago
				</Tag>
			</div>
		</div>
	);
};

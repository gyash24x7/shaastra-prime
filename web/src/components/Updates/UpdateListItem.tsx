import { ClockCircleFilled } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";

const { Text, Paragraph } = Typography;

interface UpdateListItemProps {
	update: any;
}

export const UpdateListItem = ({ update }: UpdateListItemProps) => {
	const { setDrawerComponent, setDrawerProps } = useContext(DrawerContext)!;

	return (
		<div
			className="update-list-item"
			onClick={() => {
				setDrawerProps({
					title: (
						<CommonDrawerTitle
							title={update.subject}
							onClose={() => setDrawerComponent(undefined)}
							extra={
								<Space size={0} style={{ marginTop: 10 }}>
									<Tag color="red">{update.byDept.name}</Tag>
									<Tag color="cyan">{update.postedBy.name}</Tag>
									<Tag icon={<ClockCircleFilled />} color="lime">
										6 Days Ago
									</Tag>
								</Space>
							}
						/>
					)
				});
				setDrawerComponent(
					<div dangerouslySetInnerHTML={{ __html: update.content }} />
				);
			}}
		>
			<div className="update-brief">
				<Text strong>{update.subject}</Text>
				<Paragraph>{update.brief}</Paragraph>
			</div>
			<div className="update-actions">
				<Tag color="red">{update.byDept.name}</Tag>
				<Tag color="cyan">{update.postedBy.name}</Tag>
				<Tag icon={<ClockCircleFilled />} color="lime">
					6 Days Ago
				</Tag>
			</div>
		</div>
	);
};

import { ClockCircleFilled } from "@ant-design/icons";
import { Button, Space, Tag, Typography } from "antd";
import React, { Fragment, useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { SwitchingIcon } from "../shared/SwitchingIcon";

const { Text, Paragraph, Title } = Typography;

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
						<Fragment>
							<div className="drawer-header">
								<Title level={4}>{update.subject}</Title>
								<Button
									icon={<SwitchingIcon name="close" className="editor-icon" />}
									className="editor-btn"
									onClick={() => setDrawerComponent(undefined)}
								/>
							</div>
							<Space size={0} style={{ marginTop: 10 }}>
								<Tag color="red">{update.byDept.name}</Tag>
								<Tag color="cyan">{update.postedBy.name}</Tag>
								<Tag icon={<ClockCircleFilled />} color="lime">
									6 Days Ago
								</Tag>
							</Space>
						</Fragment>
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

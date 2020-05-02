import { ClockCircleFilled } from "@ant-design/icons";
import { Button, Space, Tag, Typography } from "antd";
import React, { Fragment, useContext } from "react";
import { DrawerContext } from "../../utils/context";
import { stringGen } from "../../utils/lorem";
import { SwitchingIcon } from "../shared/SwitchingIcon";

const { Text, Paragraph, Title } = Typography;

interface UpdateListItemProps {
	update: { byDept: string; postedBy: string };
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
								<Title level={4}>{stringGen.generateWords(4)}</Title>
								<Button
									icon={<SwitchingIcon name="close" className="editor-icon" />}
									className="editor-btn"
									onClick={() => setDrawerComponent(undefined)}
								/>
							</div>
							<Space size={0} style={{ marginTop: 10 }}>
								<Tag color="red">{update.byDept}</Tag>
								<Tag color="cyan">Yash Gupta</Tag>
								<Tag icon={<ClockCircleFilled />} color="lime">
									6 Days Ago
								</Tag>
							</Space>
						</Fragment>
					)
				});
				setDrawerComponent!(
					<Paragraph>{stringGen.generateParagraphs(4)}</Paragraph>
				);
			}}
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

import { List, Typography } from "antd";
import React from "react";

import { stringGen } from "../../utils/lorem";

export const UpdateList = () => {
	return (
		<List
			itemLayout="horizontal"
			bordered
			header={<Typography.Title level={4}>Updates</Typography.Title>}
			className="update-list"
		>
			{[...Array(10)].map(() => (
				<List.Item>
					<List.Item.Meta
						title={
							<Typography.Text strong>
								{stringGen.generateWords(2)}
							</Typography.Text>
						}
						description={stringGen.generateSentences(1)}
					/>
				</List.Item>
			))}
		</List>
	);
};

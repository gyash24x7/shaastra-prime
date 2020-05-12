import { Card, Empty } from "antd";
import React from "react";

export const NoChannelScreen = () => {
	return (
		<Card className="message-screen">
			<Empty description="Select Channel To View Messages" />
		</Card>
	);
};

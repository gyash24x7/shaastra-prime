import React from "react";
import { useParams } from "react-router-dom";

import { PrivateLayout } from "../shared/PrivateLayout";

export const ChatScreen = () => {
	const { channel } = useParams();

	return (
		<PrivateLayout title={channel}>
			<div className="screen-wrapper">Chat Screen</div>
		</PrivateLayout>
	);
};

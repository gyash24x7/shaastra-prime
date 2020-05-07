import { Spin } from "antd";
import React from "react";

export const Loader = () => (
	<div
		style={{
			width: "100%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}}
		className="loading-wrapper"
	>
		<Spin size="large" />
	</div>
);

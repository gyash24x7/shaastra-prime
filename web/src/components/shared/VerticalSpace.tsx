import React from "react";

interface VerticalSpaceProps {
	size?: "small" | "middle" | "large";
}

export const VerticalSpace = ({ size }: VerticalSpaceProps) => {
	return (
		<div
			style={{ margin: size === "large" ? 20 : size === "middle" ? 15 : 10 }}
		/>
	);
};

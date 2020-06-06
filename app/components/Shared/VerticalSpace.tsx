import React from "react";
import { View } from "react-native";

interface VerticalSpaceProps {
	size?: "large" | "medium" | "small" | "tiny";
}

export const VerticalSpace = ({ size }: VerticalSpaceProps) => {
	return (
		<View
			style={{
				padding:
					size === "large"
						? 20
						: size === "medium"
						? 15
						: size === "tiny"
						? 5
						: 10
			}}
		/>
	);
};

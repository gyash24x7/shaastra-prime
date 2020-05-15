import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import globalStyles from "../../utils/globalStyles";

interface PageTitleProps {
	text: string;
}

export const PageTitle = (props: PageTitleProps) => {
	return (
		<Layout
			style={{
				width: "100%",
				paddingBottom: 10,
				backgroundColor: "transparent"
			}}
		>
			<Text
				style={[
					globalStyles.title,
					{ textAlign: "center", color: "#36b37e", fontSize: 28 }
				]}
			>
				{props.text}
			</Text>
		</Layout>
	);
};

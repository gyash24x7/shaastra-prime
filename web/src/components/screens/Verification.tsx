import { Layout, Text } from "@ui-kitten/components";
import React from "react";

export const VerificationScreen = ({ rollNumber }: { rollNumber: string }) => {
	return (
		<Layout>
			<Text>Verification Screen: {rollNumber}</Text>
		</Layout>
	);
};

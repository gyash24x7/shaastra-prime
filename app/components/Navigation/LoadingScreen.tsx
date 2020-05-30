import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Layout
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%"
				}}
			>
				<Spinner />
			</Layout>
		</SafeAreaView>
	);
};

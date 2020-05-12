import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";

export const UserMedia = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<Layout style={globalStyles.wrapper}>
				<Text>User Media</Text>
			</Layout>
		</SafeAreaView>
	);
};

import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

export const UserDetails = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor="#141414" />
			<Layout style={styles.wrapper}>
				<Text>User Details</Text>
			</Layout>
		</SafeAreaView>
	);
};

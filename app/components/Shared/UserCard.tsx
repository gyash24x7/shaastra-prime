import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

export const UserCard = () => {
	return (
		<Layout style={styles.userCard}>
			<Text>User Card</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	userCard: {
		borderColor: "#303030",
		borderWidth: 2,
		margin: 10,
		padding: 20,
		borderRadius: 5
	}
});

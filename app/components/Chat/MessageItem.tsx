import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "../../utils/globalStyles";

export const MessageItem = ({ item: message }: any) => {
	return (
		<Layout style={styles.messageContainer}>
			<Layout style={styles.messageMeta}>
				<Text style={[globalStyles.heading, styles.senderName]}>
					{message.createdBy}
				</Text>
				<Text style={[globalStyles.heading, styles.messageTime]}>
					{message.createdAt}
				</Text>
			</Layout>
			<Text style={[globalStyles.text, styles.text]}>{message.content}</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: "#303030",
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 5
	},
	senderName: { fontSize: 11, marginBottom: 5, color: "#ffab00" },
	text: { fontSize: 13 },
	messageMeta: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	messageTime: {
		fontSize: 11,
		color: "#bae637"
	}
});

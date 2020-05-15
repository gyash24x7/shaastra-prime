import { Layout, List } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { stringGen } from "../../utils/lorem";
import { TopNav } from "../Navigation/TopNav";
import { MessageInput } from "./MessageInput";
import { MessageItem } from "./MessageItem";

export const ChannelView = () => {
	const [messages, setMessages] = useState(
		[...Array(40)].map(() => ({
			content: stringGen.generateSentences(3),
			createdBy: stringGen.generateWords(2),
			createdAt: "12:30 AM"
		}))
	);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Webops-O&IP Connect" isSmall />
			<Layout style={globalStyles.wrapper}>
				<List
					data={messages}
					renderItem={MessageItem}
					style={styles.messagesWrapper}
					inverted
				/>
			</Layout>
			<MessageInput
				onSend={() =>
					setMessages([
						{
							content: stringGen.generateSentences(3),
							createdBy: stringGen.generateWords(2),
							createdAt: "12:30 AM"
						},
						...messages
					])
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	messagesWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent"
	}
});

import { Button, Input, Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../../utils/globalStyles";
import { TopNav } from "../Navigation/TopNav";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

export const ChannelView = () => {
	const [actionSheetVisible, setActionSheetVisible] = useState(false);
	const [message, setMessage] = useState("");

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Webops-O&IP Connect" isSmall />
			<Layout style={globalStyles.wrapper}></Layout>
			<KeyboardAvoidingView style={styles.messageInputContainer}>
				<Input
					style={styles.messageInput}
					placeholder="Message..."
					value={message}
					onChangeText={setMessage}
					accessoryLeft={(props) => <SwitchingIcon {...props} name="audio" />}
				/>
				<Button
					style={[styles.iconButton, styles.sendButton]}
					accessoryLeft={(props) => (
						<SwitchingIcon {...props} name="paper-clip" />
					)}
					onPress={() => setActionSheetVisible(true)}
					appearance="ghost"
				/>
				<Button
					appearance="ghost"
					style={[styles.iconButton, styles.sendButton]}
					accessoryLeft={(props) => <SwitchingIcon {...props} name="send" />}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	messageInputContainer: {
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 16,
		backgroundColor: "#141414"
	},
	attachButton: {
		borderRadius: 24,
		marginHorizontal: 8
	},
	messageInput: {
		flex: 1,
		marginHorizontal: 8
	},
	sendButton: {
		marginRight: 4
	},
	iconButton: {
		width: 24,
		height: 24
	}
});

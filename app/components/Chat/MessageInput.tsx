import { Button, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { SwitchingIcon } from "../Shared/SwitchingIcon";

interface MessageInputProps {
	onSend: () => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
	const [message, setMessage] = useState("");

	return (
		<KeyboardAvoidingView style={styles.messageInputContainer}>
			<Input
				style={styles.messageInput}
				placeholder="Start Typing..."
				value={message}
				onChangeText={setMessage}
			/>
			<Button
				style={[styles.sendButton]}
				accessoryLeft={(props) => (
					<SwitchingIcon {...props} name="paper-clip" />
				)}
				appearance="ghost"
			/>
			<Button
				appearance="ghost"
				style={[styles.sendButton]}
				accessoryLeft={(props) => <SwitchingIcon {...props} name="send" />}
				onPress={onSend}
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	messageInputContainer: {
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 16,
		backgroundColor: "#141414",
		borderTopColor: "#303030",
		borderTopWidth: 1
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
		marginRight: 4,
		width: 24,
		height: 24
	}
});

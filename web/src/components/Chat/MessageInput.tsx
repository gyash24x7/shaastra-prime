import { Button, Space } from "antd";
import { CompositeDecorator, EditorState } from "draft-js";
import React, { useState } from "react";
import { useCreateMessageMutation } from "../../generated";
import { EDITOR_NULL_VALUES } from "../../utils/constants";
import Editor from "../Editor";
import {
	DraftHash,
	DraftLink,
	hashtagStrategy,
	linkStrategy
} from "../Editor/utils";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";

interface MessageInputProps {
	channelId: string;
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
	const decorator = new CompositeDecorator([
		{ strategy: linkStrategy, component: DraftLink },
		{ strategy: hashtagStrategy, component: DraftHash }
	]);

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(decorator)
	);
	const [emojiVisible, setEmojiVisible] = useState(false);
	const [createMessage, { error, loading }] = useCreateMessageMutation();

	const toggleEmoji = () => setEmojiVisible(!emojiVisible);

	const handleSubmit = () => {
		const content = "";
		if (content && !EDITOR_NULL_VALUES.includes(content)) {
			createMessage({ variables: { channelId, content, media: [] } }).then(() =>
				setEditorState(EditorState.createEmpty())
			);
		} else {
			console.log("here!");
		}
	};

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<Editor
			style={{ height: 50, margin: 10, overflowY: "scroll", zIndex: -1 }}
			toolbarExtra={
				<Space>
					<Button
						className="editor-btn"
						icon={<SwitchingIcon name="emoji" className="editor-icon" />}
						onClick={toggleEmoji}
					/>
					<Button
						className="editor-btn"
						icon={<SwitchingIcon name="upload" className="editor-icon" />}
					/>
					<Button
						className="editor-btn"
						icon={<SwitchingIcon name="send" className="editor-icon" />}
						loading={loading}
						onClick={handleSubmit}
					/>
				</Space>
			}
			editorState={editorState}
			setEditorState={setEditorState}
			placeholder="Start Typing..."
			onShiftEnter={handleSubmit}
			emojiVisible={emojiVisible}
			setEmojiVisible={setEmojiVisible}
		/>
	);
};

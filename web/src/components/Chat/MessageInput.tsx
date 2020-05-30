import { Button, Space } from "antd";
import { CompositeDecorator, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useContext, useState } from "react";
import { useCreateMessageMutation, User } from "../../generated";
import { ModalContext } from "../../utils/context";
import Editor from "../Editor";
import { DraftHash, HashtagStrategy } from "../Editor/HashtagPlugin";
import { DraftLink, LinkStrategy } from "../Editor/LinkifyPlugin";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { MediaMessageInput } from "./MediaMessageInput";

interface MessageInputProps {
	channelId: string;
	members: Partial<User>[];
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
	const [emojiVisible, setEmojiVisible] = useState(false);
	const [createMessage, { error, loading }] = useCreateMessageMutation();

	const decorator = new CompositeDecorator([
		{ strategy: LinkStrategy, component: DraftLink },
		{ strategy: HashtagStrategy, component: DraftHash }
	]);

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(decorator)
	);

	const { toggleModal } = useContext(ModalContext)!;

	const toggleEmoji = () => setEmojiVisible(!emojiVisible);

	const openMediaMessageInput = () => {
		toggleModal({
			component: <MediaMessageInput handleUpload={handleUpload} />,
			props: { title: "Send Media" }
		});
	};

	const handleUpload = (media: string[]) => {
		createMessage({ variables: { content: "", channelId, media } }).then(() =>
			toggleModal()
		);
	};

	const handleSubmit = () => {
		const rawContent = convertToRaw(editorState.getCurrentContent());
		const content = draftToHtml(rawContent, { trigger: "#", separator: " " });
		const plainText = rawContent.blocks
			.map((block) => block.text.trim())
			.join("");

		if (plainText.length !== 0) {
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

	const ToolbarExtra = (
		<Space>
			<Button
				className="editor-btn"
				icon={<SwitchingIcon name="emoji" className="editor-icon" />}
				onClick={toggleEmoji}
			/>
			<Button
				className="editor-btn"
				icon={<SwitchingIcon name="upload" className="editor-icon" />}
				onClick={openMediaMessageInput}
			/>
			<Button
				className="editor-btn"
				icon={<SwitchingIcon name="send" className="editor-icon" />}
				loading={loading}
				onClick={handleSubmit}
			/>
		</Space>
	);

	return (
		<Editor
			editorState={editorState}
			setEditorState={setEditorState}
			style={{ height: 50, margin: 10, overflowY: "scroll", zIndex: -1 }}
			toolbarExtra={ToolbarExtra}
			placeholder="Start Typing..."
			onShiftEnter={handleSubmit}
			emojiVisible={emojiVisible}
			setEmojiVisible={setEmojiVisible}
		/>
	);
};

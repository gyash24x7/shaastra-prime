import { Button, Space } from "antd";
import { CompositeDecorator, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { Fragment, useState } from "react";
import { useCreateMessageMutation, User } from "../../generated";
import Editor from "../Editor";
import { DraftHash, HashtagStrategy } from "../Editor/HashtagPlugin";
import { DraftLink, LinkStrategy } from "../Editor/LinkifyPlugin";
import {
	DraftMention,
	getMentionState,
	insertMention,
	MentionState,
	MentionStrategy,
	users
} from "../Editor/MentionPlugin";
import { normalizeIndex } from "../Editor/utils";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { MentionSuggestions } from "./MentionSuggestions";

interface MessageInputProps {
	channelId: string;
	members: Partial<User>[];
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
	const [emojiVisible, setEmojiVisible] = useState(false);
	const [mentionState, setMentionState] = useState<MentionState | null>(null);
	const [createMessage, { error, loading }] = useCreateMessageMutation();

	const decorator = new CompositeDecorator([
		{ strategy: LinkStrategy, component: DraftLink },
		{ strategy: HashtagStrategy, component: DraftHash },
		{ strategy: MentionStrategy, component: DraftMention }
	]);

	const [editorState, setEditorState] = useState(
		EditorState.createEmpty(decorator)
	);

	const toggleEmoji = () => setEmojiVisible(!emojiVisible);

	const handleKeyPress = (e: any, type: string) => {
		let newMentionState = getMentionState(editorState, mentionState, false);
		if (!newMentionState) return;
		e.preventDefault();

		switch (type) {
			case "DOWN":
				newMentionState.selectedIndex++;
				break;

			case "UP":
				newMentionState.selectedIndex--;
				break;

			case "ESC":
				newMentionState = null;
				break;
		}

		setMentionState(newMentionState);
	};

	const handleMentionSelect = () => {
		const filteredMembers = users.filter(({ name }) =>
			name.startsWith(mentionState!.text.replace(/^@/, ""))
		);

		const index = normalizeIndex(
			mentionState!.selectedIndex,
			filteredMembers.length
		);
		const newEditorState = insertMention(
			editorState,
			mentionState!.text,
			filteredMembers[index].name
		);
		//Do Something with Mentions
		setEditorState(newEditorState);
		setMentionState(null);
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
		<Fragment>
			<Editor
				editorState={editorState}
				setEditorState={setEditorState}
				mentionState={mentionState}
				setMentionState={setMentionState}
				style={{ height: 50, margin: 10, overflowY: "scroll", zIndex: -1 }}
				toolbarExtra={ToolbarExtra}
				placeholder="Start Typing..."
				onShiftEnter={handleSubmit}
				emojiVisible={emojiVisible}
				setEmojiVisible={setEmojiVisible}
				handleKeyPress={handleKeyPress}
				handleMentionSelect={handleMentionSelect}
			/>
			{mentionState && <MentionSuggestions {...mentionState} />}
		</Fragment>
	);
};

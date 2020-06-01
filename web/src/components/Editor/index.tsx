import { Typography } from "antd";
import {
	CompositeDecorator,
	Editor,
	EditorState,
	getDefaultKeyBinding,
	RichUtils
} from "draft-js";
import "draft-js/dist/Draft.css";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { Fragment, useCallback } from "react";
import { insertEmoji } from "./EmojiPlugin";
import { DraftHash, HashtagStrategy } from "./HashtagPlugin";
import { DraftLink, LinkStrategy } from "./LinkifyPlugin";
import { Toolbar } from "./Toolbar";
import { pickerStyle } from "./utils";

const { Paragraph } = Typography;

interface EditorProps {
	toolbarExtra?: JSX.Element;
	autoFocus?: boolean;
	style?: React.CSSProperties;
	placeholder?: string;
	onShiftEnter?: () => void;
	emojiVisible?: boolean;
	setEmojiVisible?: (val: boolean) => void;
	editorState: EditorState;
	setEditorState: (val: EditorState) => void;
}

export default (props: EditorProps) => {
	const { onShiftEnter, editorState, setEditorState } = props;

	const handleKeyCommand = useCallback(
		(command: string, editorState: EditorState) => {
			if (command === "message-send") {
				onShiftEnter && onShiftEnter();
				return "handled";
			}

			if (command === "arrow" || command === "escape") return "handled";

			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setEditorState(newState);
				return "handled";
			}
			return "not-handled";
		},
		[setEditorState, onShiftEnter]
	);

	const mapKeyToEditorCommand = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.keyCode) {
				case 9:
					const newEditorState = RichUtils.onTab(e, editorState, 4);
					if (newEditorState !== editorState) {
						setEditorState(newEditorState);
					}
					return null;

				case 13:
					e.preventDefault();
					if (e.shiftKey) return "message-send";
					break;
			}
			return getDefaultKeyBinding(e);
		},
		[editorState, setEditorState]
	);

	let className = "";
	let contentState = editorState.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== "unstyled") {
			className += " editor-hide-placeholder";
		}
	}

	const handleEmojiSelect = (val: BaseEmoji) => {
		const newEditorState = insertEmoji(editorState, val.native);
		setEditorState(newEditorState);
	};

	return (
		<Fragment>
			<div className="editor-wrapper">
				<div
					style={props.style}
					className={className}
					onClick={() => props.setEmojiVisible && props.setEmojiVisible(false)}
				>
					<Editor
						editorState={editorState}
						onChange={setEditorState}
						handleKeyCommand={handleKeyCommand}
						placeholder={props.placeholder}
						keyBindingFn={mapKeyToEditorCommand}
					/>
				</div>
				<Toolbar
					extra={props.toolbarExtra}
					editorState={editorState}
					setEditorState={setEditorState}
				/>
			</div>
			{props.emojiVisible && (
				<Picker
					theme="dark"
					showPreview={false}
					color="#B3B3B3"
					style={pickerStyle}
					onSelect={handleEmojiSelect}
				/>
			)}
			{props.onShiftEnter && (
				<Paragraph className="editor-help-text">
					Press SHIFT + ENTER to send
				</Paragraph>
			)}
		</Fragment>
	);
};

export const composedDecorator = new CompositeDecorator([
	{ strategy: LinkStrategy, component: DraftLink },
	{ strategy: HashtagStrategy, component: DraftHash }
]);

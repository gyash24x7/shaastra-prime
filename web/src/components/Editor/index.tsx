import { Typography } from "antd";
import {
	DraftHandleValue,
	Editor,
	EditorState,
	getDefaultKeyBinding,
	RichUtils
} from "draft-js";
import "draft-js/dist/Draft.css";
import { BaseEmoji, Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { Fragment, useCallback } from "react";
import { Toolbar } from "./Toolbar";
import { insertEmoji } from "./utils";

const { Paragraph } = Typography;

interface EditorProps {
	toolbarExtra?: JSX.Element;
	autoFocus?: boolean;
	style?: React.CSSProperties;
	placeholder?: string;
	onShiftEnter?: () => void;
	editorState: EditorState;
	setEditorState: (val: EditorState) => void;
	emojiVisible: boolean;
	setEmojiVisible: (val: boolean) => void;
}

export default (props: EditorProps) => {
	const { setEditorState, editorState, placeholder } = props;

	const handleKeyCommand = useCallback(
		(command: string, editorState: EditorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setEditorState(newState);
				return "handled" as DraftHandleValue;
			}
			return "not-handled" as DraftHandleValue;
		},
		[setEditorState]
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
				<div style={props.style} className={className}>
					<Editor
						onFocus={() => props.setEmojiVisible(false)}
						editorState={editorState}
						onChange={setEditorState}
						handleKeyCommand={handleKeyCommand}
						placeholder={placeholder}
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
					style={{
						backgroundColor: "#141414",
						border: "1px solid #303030",
						position: "fixed",
						bottom: 75,
						right: 41,
						boxShadow: "0px 0px 2px 2px #303030",
						zIndex: 100
					}}
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

import { Typography } from "antd";
import {
	DraftHandleValue,
	EditorState,
	getDefaultKeyBinding,
	RichUtils
} from "draft-js";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { Fragment, useCallback } from "react";
import { Toolbar } from "./Toolbar";

const { Paragraph } = Typography;
const linkifyPlugin = createLinkifyPlugin();
const plugins = [linkifyPlugin];

interface EditorProps {
	toolbarExtra?: JSX.Element;
	autoFocus?: boolean;
	style?: React.CSSProperties;
	placeholder?: string;
	onShiftEnter?: () => void;
	value: EditorState;
	setValue: (val: EditorState) => void;
	emojiVisible: boolean;
}

export default (props: EditorProps) => {
	const { setValue, value, placeholder } = props;

	const handleKeyCommand = useCallback(
		(command: string, editorState: EditorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setValue(newState);
				return "handled" as DraftHandleValue;
			}
			return "not-handled" as DraftHandleValue;
		},
		[setValue]
	);

	const mapKeyToEditorCommand = useCallback(
		(e) => {
			switch (e.keyCode) {
				case 9:
					const newEditorState = RichUtils.onTab(e, value, 4);
					if (newEditorState !== value) {
						setValue(newEditorState);
					}
					return null;
			}
			return getDefaultKeyBinding(e);
		},
		[value, setValue]
	);

	let className = "";
	let contentState = value.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType() !== "unstyled") {
			className += " editor-hide-placeholder";
		}
	}

	return (
		<Fragment>
			<div className="editor-wrapper">
				<div style={props.style} className={className}>
					<Editor
						editorState={value}
						onChange={setValue}
						handleKeyCommand={handleKeyCommand}
						placeholder={placeholder}
						keyBindingFn={mapKeyToEditorCommand}
						plugins={plugins}
					/>
				</div>
				<Toolbar extra={props.toolbarExtra} value={value} setValue={setValue} />
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
						boxShadow: "0px 0px 2px 2px #303030"
					}}
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

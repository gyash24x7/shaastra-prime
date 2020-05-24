import { ContentBlock, EditorState } from "draft-js";
import { CSSProperties } from "react";

export const HOTKEYS: Record<string, string> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline"
};

export const LIST_TYPES = ["ordered-list-item", "unordered-list-item"];

export const findWithRegex = (
	regex: RegExp,
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void
) => {
	const text = contentBlock.getText();
	let matchArr, start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
};

export const normalizeIndex = (selectedIndex: number, max: number) => {
	let index = selectedIndex % max;
	if (index < 0) {
		index += max;
	}
	return index;
};

export const hasEntityAtSelection = (editorState: EditorState) => {
	const selection = editorState.getSelection();
	if (!selection.getHasFocus()) {
		return false;
	}

	const contentState = editorState.getCurrentContent();
	const block = contentState.getBlockForKey(selection.getStartKey());
	return !!block.getEntityAt(selection.getStartOffset() - 1);
};

export const pickerStyle: CSSProperties = {
	backgroundColor: "#141414",
	border: "1px solid #303030",
	position: "fixed",
	bottom: 75,
	right: 41,
	boxShadow: "0px 0px 2px 2px #303030",
	zIndex: 100
};

import { Tag } from "antd";
import {
	ContentBlock,
	ContentState,
	EditorState,
	Entity,
	Modifier,
	SelectionState
} from "draft-js";
import React from "react";
import { stringGen } from "../../utils/lorem";
import { hasEntityAtSelection } from "./utils";

export const users = [...Array(25)].map((_, i) => ({
	id: i,
	name: stringGen.generateWords(2)
}));

export const MENTION_REGEX = /\B(@[a-zA-Z]+\b)(?!;)/g;

export const MentionStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
) => {
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getMutability() === "SEGMENTED" &&
			contentState.getEntity(entityKey).getType() === "MENTION"
		);
	}, callback);
};

export const DraftMention = (props: any) => (
	<Tag color="cyan">{props.children}</Tag>
);

export const getMentionRange = (editorState: EditorState) => {
	const selection = window.getSelection();

	if (!selection || selection?.rangeCount === 0) return null;

	if (hasEntityAtSelection(editorState)) return null;

	const range = selection.getRangeAt(0);
	let text = range.startContainer.textContent!;
	text = text.substring(0, range.startOffset);

	const index = text?.lastIndexOf("@");
	if (index === -1) return null;

	text = text.substring(index);

	return { text, start: index, end: range.startOffset };
};

export interface MentionState {
	left: number;
	top: number;
	text: string;
	selectedIndex: number;
}

export const getMentionState = (
	editorState: EditorState,
	mentionState: MentionState | null = null,
	invalidate = true
) => {
	if (!invalidate) {
		return mentionState;
	}

	const mentionRange = getMentionRange(editorState);
	if (!mentionRange) {
		return null;
	}

	const tempRange = window.getSelection()!.getRangeAt(0).cloneRange();
	tempRange.setStart(tempRange.startContainer, mentionRange.start);

	const rangeRect = tempRange.getBoundingClientRect();

	return {
		left: rangeRect.left,
		top: rangeRect.bottom,
		text: mentionRange.text,
		selectedIndex: 0
	};
};

export const insertMention = (
	editorState: EditorState,
	searchText: string,
	mentionContent: string
) => {
	const contentState = editorState.getCurrentContent();
	const selection = contentState.getSelectionAfter();

	const entitySelection = selection.set(
		"anchorOffset",
		selection.getFocusOffset() - searchText.length
	) as SelectionState;

	const contentStateWithEntity = Modifier.replaceText(
		contentState,
		entitySelection,
		mentionContent,
		undefined,
		Entity.create("MENTION", "SEGMENTED")
	);

	return EditorState.push(editorState, contentStateWithEntity, "apply-entity");
};

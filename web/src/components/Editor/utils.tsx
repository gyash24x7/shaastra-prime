import { ContentBlock, ContentState, EditorState, Modifier } from "draft-js";
import { uncompress } from "emoji-mart/dist-es/utils/data";
import { getSanitizedData, unifiedToNative } from "emoji-mart/dist/utils";
import emojiRegexp from "emoji-regex";
import React from "react";

export const HOTKEYS: Record<string, string> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline"
};

export const LIST_TYPES = ["ordered-list-item", "unordered-list-item"];

export const linkStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
) => {
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
};

export const hashtagStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void
) => {
	findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const findWithRegex = (
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

export const DraftLink = (props: any) => {
	const { url } = props.contentState.getEntity(props.entityKey).getData();
	return (
		<a href={url} style={styles.link}>
			{props.children}
		</a>
	);
};

export const DraftHash = (props: any) => {
	return (
		<span style={styles.hashtag} data-offset-key={props.offsetKey}>
			{props.children}
		</span>
	);
};

const HASHTAG_REGEX = /\B(#[a-zA-Z]+\b)(?!;)/g;

const styles = {
	link: {
		color: "#3b5998",
		textDecoration: "underline"
	},
	hashtag: {
		color: "rgba(95, 184, 138, 1.0)"
	}
};

export const insertEmoji = (editorState: EditorState, emoji: string) => {
	const contentState = editorState.getCurrentContent();
	const contentStateWithEntity = contentState.createEntity(
		"emoji",
		"IMMUTABLE",
		{ emojiUnicode: emoji }
	);
	const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
	const currentSelection = editorState.getSelection();

	const contentStateAfterSelectionRemoval = Modifier.removeRange(
		contentState,
		currentSelection,
		"backward"
	);

	const targetSelection = contentStateAfterSelectionRemoval.getSelectionAfter();

	let emojiContent = Modifier.insertText(
		contentStateAfterSelectionRemoval,
		targetSelection,
		emoji,
		undefined,
		entityKey
	);

	const emojiEndPosition = targetSelection.getAnchorOffset();
	const blockKey = targetSelection.getAnchorKey();
	const blockSize = contentState.getBlockForKey(blockKey).getLength();

	if (emojiEndPosition === blockSize) {
		emojiContent = Modifier.insertText(
			emojiContent,
			emojiContent.getSelectionAfter(),
			" "
		);
	}

	const newEditorState = EditorState.push(
		editorState,
		emojiContent,
		"insert-characters"
	);

	return EditorState.forceSelection(
		newEditorState,
		emojiContent.getSelectionAfter()
	);
};

export const emojiStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void
) => {
	findWithRegex(emojiRegexp(), contentBlock, callback);
};

export const convertShortNameToUnicode = (unicode: string) => {
	if (unicode.indexOf("-") > -1) {
		const parts = [];

		const s = unicode.split("-");

		for (let i = 0; i < s.length; i += 1) {
			let part: any = parseInt(s[i], 16);

			if (part >= 0x10000 && part <= 0x10ffff) {
				const hi = Math.floor((part - 0x10000) / 0x400) + 0xd800;
				const lo = ((part - 0x10000) % 0x400) + 0xdc00;
				part = String.fromCharCode(hi) + String.fromCharCode(lo);
			} else {
				part = String.fromCharCode(part);
			}

			parts.push(part);
		}

		return parts.join("");
	}

	const s = parseInt(unicode, 16);

	if (s >= 0x10000 && s <= 0x10ffff) {
		const hi = Math.floor((s - 0x10000) / 0x400) + 0xd800;
		const lo = ((s - 0x10000) % 0x400) + 0xdc00;

		return String.fromCharCode(hi) + String.fromCharCode(lo);
	}

	return String.fromCharCode(s);
};

type EmojiEntity = {
	id: string;
	unified: string;
	short_names: Array<string>;
};

export type DataSet = {
	compressed: boolean;
	emojis: Record<string, EmojiEntity>;
};

export const getEmojiDataFromNative = (data: DataSet, set: string) => (
	nativeString: string
) => {
	if (data.compressed) {
		uncompress(data as any);
	}

	const emojiData = Object.values(data.emojis).find(
		(emoji) => unifiedToNative(emoji.unified) === nativeString
	);

	if (!emojiData) return null;

	const [id] = emojiData.short_names;
	emojiData.id = id;

	return getSanitizedData(emojiData, " ", set, data);
};

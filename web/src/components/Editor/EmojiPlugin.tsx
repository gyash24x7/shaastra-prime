import { EditorState, Modifier } from "draft-js";

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

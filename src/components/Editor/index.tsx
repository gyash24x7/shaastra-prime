import React, { useState } from "react";
import {
	EditorState,
	getDefaultKeyBinding,
	KeyBindingUtil,
	RichUtils
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import Button, { ButtonGroup } from "@atlaskit/button";
import BoldIcon from "@atlaskit/icon/glyph/editor/bold";
import ItalicIcon from "@atlaskit/icon/glyph/editor/italic";
import UnderlineIcon from "@atlaskit/icon/glyph/editor/underline";
import BulletListIcon from "@atlaskit/icon/glyph/editor/bullet-list";
import NumberListIcon from "@atlaskit/icon/glyph/editor/number-list";
// import { stateToHTML } from "draft-js-export-html";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";

const emojiPlugin = createEmojiPlugin();
const linkifyPlugin = createLinkifyPlugin();
const { EmojiSuggestions } = emojiPlugin;

export const ChatEditor = () => {
	const [ editorState, setEditorState ] = useState( EditorState.createEmpty() );

	const handleKeyCommand = ( commad: string, newEditorState: EditorState ) => {
		const newState = RichUtils.handleKeyCommand( newEditorState, commad );
		if ( newState ) {
			setEditorState( newState );
			return "handled";
		}
		return "not-handled";
	};

	const onBlockSelect = ( blockType: string ) => () => {
		setEditorState( RichUtils.toggleBlockType( editorState, blockType ) );
	};

	const onStyleBtnClick = ( command: string ) => () => {
		setEditorState(
			RichUtils.toggleInlineStyle( editorState, command.toUpperCase() )
		);
	};

	// const getSerializedValue = () => {
	// 	let htmlString = stateToHTML(editorState.getCurrentContent());
	// 	setEditorState(EditorState.createEmpty());
	// 	return htmlString;
	// };

	const keyBindingFn = ( e: React.KeyboardEvent ) => {
		if ( e.keyCode === 72 && KeyBindingUtil.hasCommandModifier( e ) ) {
			return "heading";
		}
		return getDefaultKeyBinding( e );
	};

	const currentInlineStyle = editorState.getCurrentInlineStyle();

	const currentBlockType = editorState
		.getCurrentContent()
		.getBlockForKey( editorState.getSelection().getStartKey() )
		.getType();

	return (
		<div className="editor-wrapper">
			<ButtonGroup>
				<Button
					appearance={ currentInlineStyle.has( "BOLD" ) ? "default" : "subtle" }
					onClick={ onStyleBtnClick( "bold" ) }
					iconBefore={ <BoldIcon label=""/> }
				/>
				<Button
					appearance={ currentInlineStyle.has( "ITALIC" )
						? "default"
						: "subtle" }
					onClick={ onStyleBtnClick( "italic" ) }
					iconBefore={ <ItalicIcon label=""/> }
				/>
				<Button
					appearance={
						currentInlineStyle.has( "UNDERLINE" ) ? "default" : "subtle"
					}
					onClick={ onStyleBtnClick( "underline" ) }
					iconBefore={ <UnderlineIcon label=""/> }
				/>
				<Button
					appearance={
						currentBlockType === "ordered-list-item" ? "default" : "subtle"
					}
					onClick={ onBlockSelect( "ordered-list-item" ) }
					iconBefore={ <NumberListIcon label=""/> }
				/>
				<Button
					appearance={
						currentBlockType === "unordered-list-item" ? "default" : "subtle"
					}
					onClick={ onBlockSelect( "unordered-list-item" ) }
					iconBefore={ <BulletListIcon label=""/> }
				/>
			</ButtonGroup>
			<Editor
				handleKeyCommand={ handleKeyCommand }
				plugins={ [ emojiPlugin, linkifyPlugin ] }
				editorState={ editorState }
				onChange={ newEditorState => setEditorState( newEditorState ) }
				keyBindingFn={ keyBindingFn }
			/>
			<EmojiSuggestions/>
		</div>
	);
};

import React from "react";
import { Editor } from "slate";
import { RenderLeafProps } from "slate-react";

export const HOTKEYS: Record<string, string> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code"
};

export const toggleMark = (editor: Editor, format: string) => {
	console.log(editor);
	if (isMarkActive(editor, format)) Editor.removeMark(editor, format);
	else Editor.addMark(editor, format, true);
};

export const isMarkActive = (editor: Editor, format: string) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

export const Leaf = (props: RenderLeafProps) => {
	let children = { ...props.children };
	if (props.leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (props.leaf.italic) {
		children = <em>{children}</em>;
	}

	if (props.leaf.code) {
		children = <code>{children}</code>;
	}

	if (props.leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...props.attributes}>{children}</span>;
};

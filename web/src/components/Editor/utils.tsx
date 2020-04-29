import isUrl from "is-url";
import React from "react";
import { Editor, Element as SlateElement, Range, Transforms } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";

export const HOTKEYS: Record<string, string> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code"
};

export const toggleMark = (editor: Editor, format: string) => {
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

export const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const toggleBlock = (editor: Editor, format: string) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) => LIST_TYPES.includes(n.type),
		split: true
	});

	Transforms.setNodes(editor, {
		type: isActive ? "paragraph" : isList ? "list-item" : format
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

export const isBlockActive = (editor: Editor, format: string) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.type === format
	});
	return !!match;
};

export const Element = (props: RenderElementProps) => {
	switch (props.element.type) {
		case "block-quote":
			return <blockquote {...props.attributes}>{props.children}</blockquote>;
		case "bulleted-list":
			return <ul {...props.attributes}>{props.children}</ul>;
		case "numbered-list":
			return <ol {...props.attributes}>{props.children}</ol>;
		case "list-item":
			return <li {...props.attributes}>{props.children}</li>;
		case "link":
			return (
				<a {...props.attributes} href={props.element.url}>
					{props.children}
				</a>
			);
		default:
			return <p {...props.attributes}>{props.children}</p>;
	}
};

export const isLinkActive = (editor: Editor) => {
	const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
	return !!link;
};

export const unwrapLink = (editor: Editor) => {
	Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};

export const wrapLink = (editor: Editor, url: string) => {
	if (isLinkActive(editor)) {
		unwrapLink(editor);
	}

	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);
	const link = {
		type: "link",
		url,
		children: isCollapsed ? [{ text: url }] : []
	};

	if (isCollapsed) {
		Transforms.insertNodes(editor, link);
	} else {
		Transforms.wrapNodes(editor, link, { split: true });
		Transforms.collapse(editor, { edge: "end" });
	}
};

export const withLinks = (editor: any) => {
	const { insertData, insertText, isInline } = editor;

	editor.isInline = (element: SlateElement) => {
		return element.type === "link" ? true : isInline(element);
	};

	editor.insertText = (text: string) => {
		if (text && isUrl(text)) {
			wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};

	editor.insertData = (data: any) => {
		const text = data.getData("text/plain");

		if (text && isUrl(text)) {
			wrapLink(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};

export const insertLink = (editor: Editor, url: string) => {
	if (editor.selection) {
		wrapLink(editor, url);
	}
};

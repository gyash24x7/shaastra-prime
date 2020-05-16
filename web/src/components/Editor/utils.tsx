// import escapeHTML from "escape-html";
// import isUrl from "is-url";
// import React from "react";
// import {
// 	Editor,
// 	Element as SlateElement,
// 	Node,
// 	Range,
// 	Text,
// 	Transforms
// } from "slate";
// import { RenderElementProps, RenderLeafProps } from "slate-react";

export const HOTKEYS: Record<string, string> = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline"
};

// export const toggleMark = (editor: Editor, format: string) => {
// 	if (isMarkActive(editor, format)) Editor.removeMark(editor, format);
// 	else Editor.addMark(editor, format, true);
// };

// export const isMarkActive = (editor: Editor, format: string) => {
// 	const marks = Editor.marks(editor);
// 	return marks ? marks[format] === true : false;
// };

// export const Leaf = (props: RenderLeafProps) => {
// 	let children = { ...props.children };
// 	if (props.leaf.bold) {
// 		children = <strong>{children}</strong>;
// 	}

// 	if (props.leaf.italic) {
// 		children = <em>{children}</em>;
// 	}

// 	if (props.leaf.underline) {
// 		children = <u>{children}</u>;
// 	}

// 	return <span {...props.attributes}>{children}</span>;
// };

export const LIST_TYPES = ["ordered-list-item", "unordered-list-item"];

// export const toggleBlock = (editor: Editor, format: string) => {
// 	const isActive = isBlockActive(editor, format);
// 	const isList = LIST_TYPES.includes(format);

// 	Transforms.unwrapNodes(editor, {
// 		match: (n) => LIST_TYPES.includes(n.type as string),
// 		split: true
// 	});

// 	Transforms.setNodes(editor, {
// 		type: isActive ? "paragraph" : isList ? "list-item" : format
// 	});

// 	if (!isActive && isList) {
// 		const block = { type: format, children: [] };
// 		Transforms.wrapNodes(editor, block);
// 	}
// };

// export const isBlockActive = (editor: Editor, format: string) => {
// 	const [match] = Editor.nodes(editor, {
// 		match: (n) => n.type === format
// 	});
// 	return !!match;
// };

// export const Element = (props: RenderElementProps) => {
// 	switch (props.element.type) {
// 		case "bulleted-list":
// 			return <ul {...props.attributes}>{props.children}</ul>;
// 		case "numbered-list":
// 			return <ol {...props.attributes}>{props.children}</ol>;
// 		case "list-item":
// 			return <li {...props.attributes}>{props.children}</li>;
// 		case "link":
// 			return (
// 				<a {...props.attributes} href={props.element.url as string}>
// 					{props.children}
// 				</a>
// 			);
// 		default:
// 			return <p {...props.attributes}>{props.children}</p>;
// 	}
// };

// export const isLinkActive = (editor: Editor) => {
// 	const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
// 	return !!link;
// };

// export const unwrapLink = (editor: Editor) => {
// 	Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
// };

// export const wrapLink = (editor: Editor, url: string) => {
// 	if (isLinkActive(editor)) {
// 		unwrapLink(editor);
// 	}

// 	const { selection } = editor;
// 	const isCollapsed = selection && Range.isCollapsed(selection);
// 	const link = {
// 		type: "link",
// 		url,
// 		children: isCollapsed ? [{ text: url }] : []
// 	};

// 	if (isCollapsed) {
// 		Transforms.insertNodes(editor, link);
// 	} else {
// 		Transforms.wrapNodes(editor, link, { split: true });
// 		Transforms.collapse(editor, { edge: "end" });
// 	}
// };

// export const withLinks = (editor: any) => {
// 	const { insertData, insertText, isInline } = editor;

// 	editor.isInline = (element: SlateElement) => {
// 		return element.type === "link" ? true : isInline(element);
// 	};

// 	editor.insertText = (text: string) => {
// 		if (text && isUrl(text)) {
// 			wrapLink(editor, text);
// 		} else {
// 			insertText(text);
// 		}
// 	};

// 	editor.insertData = (data: any) => {
// 		const text = data.getData("text/plain");

// 		if (text && isUrl(text)) {
// 			wrapLink(editor, text);
// 		} else {
// 			insertData(data);
// 		}
// 	};

// 	return editor;
// };

// export const insertLink = (editor: Editor, url: string) => {
// 	if (editor.selection) {
// 		wrapLink(editor, url);
// 	}
// };

// export const serialize = (node: Node): string => {
// 	if (Text.isText(node)) return serializeMarks(node);

// 	const children = node.children.map((n) => serialize(n)).join("");

// 	switch (node.type as string) {
// 		case "bulleted-list":
// 			return `<ul>${children}</ul>`;
// 		case "numbered-list":
// 			return `<ol>${children}</ol>`;
// 		case "list-item":
// 			return `<li>${children}</li>`;
// 		case "paragraph":
// 			return `<p>${children}</p>`;
// 		case "link":
// 			return `<a href="${escapeHTML(
// 				node.url as string
// 			)}" target="_blank" >${children}</a>`;
// 		default:
// 			return children;
// 	}
// };

// export const serializeMarks = (node: Node) => {
// 	if (node.bold && node.italic && node.underline) {
// 		return `<strong><em><u>${node.text}</u></em></strong>`;
// 	}

// 	if (node.bold && node.italic) {
// 		return `<strong><em>${node.text}</em></strong>`;
// 	}

// 	if (node.bold && node.underline) {
// 		return `<strong><u>${node.text}</u></strong>`;
// 	}

// 	if (node.underline && node.italic) {
// 		return `<em><u>${node.text}</u></em>`;
// 	}

// 	if (node.bold) {
// 		return `<strong>${node.text}</strong>`;
// 	}

// 	if (node.italic) {
// 		return `<em>${node.text}</em>`;
// 	}

// 	if (node.underline) {
// 		return `<u>${node.text}</u>`;
// 	}

// 	return node.text as string;
// };

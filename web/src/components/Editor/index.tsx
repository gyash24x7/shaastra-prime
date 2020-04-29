import { isHotkey } from "is-hotkey";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import {
	Editable,
	RenderElementProps,
	RenderLeafProps,
	Slate,
	withReact
} from "slate-react";
import { Toolbar } from "./Toolbar";
import { Element, HOTKEYS, Leaf, toggleMark, withLinks } from "./utils";

interface EditorProps {
	toolbarExtra?: JSX.Element;
	autoFocus?: boolean;
}

export default (props: EditorProps) => {
	const editor = useMemo(
		() => withLinks(withHistory(withReact(createEditor()))),
		[]
	);

	const [value, setValue] = useState<Node[]>([
		{
			type: "paragraph",
			children: [{ text: "" }]
		}
	]);

	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	const renderElement = useCallback(
		(props: RenderElementProps) => <Element {...props} />,
		[]
	);

	return (
		<div className="editor-wrapper">
			<Slate value={value} editor={editor} onChange={(val) => setValue(val)}>
				<div className="editor-text-container">
					<Editable
						renderLeaf={renderLeaf}
						renderElement={renderElement}
						autoFocus={!!props.autoFocus}
						placeholder="Enter Text"
						onKeyDown={(e: any) => {
							for (const hotkey in HOTKEYS) {
								if (isHotkey(hotkey, e)) {
									e.preventDefault();
									const mark = HOTKEYS[hotkey];
									toggleMark(editor, mark);
								}
							}
						}}
					/>
				</div>
				<Toolbar extra={props.toolbarExtra} />
			</Slate>
		</div>
	);
};

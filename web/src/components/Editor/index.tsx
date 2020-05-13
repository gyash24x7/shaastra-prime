import { isHotkey } from "is-hotkey";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
	Element,
	HOTKEYS,
	Leaf,
	serialize,
	toggleMark,
	withLinks
} from "./utils";

interface EditorProps {
	toolbarExtra?: JSX.Element;
	autoFocus?: boolean;
	style?: React.CSSProperties;
	placeholder?: string;
	setSerializedValue: (val: string) => void;
	reset?: boolean;
	setReset?: (val: boolean) => void;
}

const defaultEditorValue: Node[] = [
	{
		type: "paragraph",
		children: [{ text: "" }]
	}
];

export default (props: EditorProps) => {
	const { setReset, reset } = props;

	const editor = useMemo(
		() => withLinks(withHistory(withReact(createEditor()))),
		[]
	);

	const [value, setValue] = useState(defaultEditorValue);

	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	const renderElement = useCallback(
		(props: RenderElementProps) => <Element {...props} />,
		[]
	);

	useEffect(() => {
		if (reset) {
			setValue(defaultEditorValue);
			setReset && setReset(false);
		}
	}, [reset, setReset]);

	return (
		<div className="editor-wrapper">
			<Slate
				value={value}
				editor={editor}
				onChange={(val) => {
					setValue(val);
					props.setSerializedValue(serialize(editor));
				}}
			>
				<div className="editor-text-container">
					<Editable
						renderLeaf={renderLeaf}
						style={props.style}
						renderElement={renderElement}
						autoFocus={!!props.autoFocus}
						placeholder={props.placeholder}
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

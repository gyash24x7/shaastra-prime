import { isHotkey } from "is-hotkey";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";
import { Toolbar } from "./Toolbar";
import { HOTKEYS, Leaf, toggleMark } from "./utils";

export default () => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
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

	return (
		<div className="editor-wrapper">
			<Slate value={value} editor={editor} onChange={(val) => setValue(val)}>
				<div className="editor-text-container">
					<Editable
						renderLeaf={renderLeaf}
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
				<Toolbar />
			</Slate>
		</div>
	);
};

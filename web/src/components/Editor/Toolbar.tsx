import { Button, Space } from "antd";
import { EditorState, RichUtils } from "draft-js";
import React from "react";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { HOTKEYS, LIST_TYPES } from "./utils";

interface ToolbarProps {
	extra?: JSX.Element;
	value: EditorState;
	setValue: (val: EditorState) => void;
}

export const Toolbar = ({ extra, value, setValue }: ToolbarProps) => {
	const selection = value.getSelection();

	const blockType = value
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	const currentStyle = value.getCurrentInlineStyle();

	return (
		<div className="editor-toolbar">
			<div className="rte-controls">
				<Space size="small">
					{Object.keys(HOTKEYS).map((key) => (
						<Button
							key={key}
							className="editor-btn"
							style={
								currentStyle.has(HOTKEYS[key].toUpperCase())
									? { background: "#303030", color: "rgba(#fff, 0.65)" }
									: {}
							}
							size="middle"
							icon={
								<SwitchingIcon
									name={HOTKEYS[key]}
									className="editor-icon"
									isActive={false}
								/>
							}
							onMouseDown={(e) => {
								e.preventDefault();
								setValue(
									RichUtils.toggleInlineStyle(value, HOTKEYS[key].toUpperCase())
								);
							}}
						/>
					))}
					{LIST_TYPES.map((list) => (
						<Button
							key={list}
							className="editor-btn"
							style={
								list === blockType
									? { background: "#303030", color: "rgba(#fff, 0.65)" }
									: {}
							}
							size="middle"
							icon={
								<SwitchingIcon
									name={list}
									className="editor-icon"
									isActive={false}
								/>
							}
							onMouseDown={(e) => {
								e.preventDefault();
								setValue(RichUtils.toggleBlockType(value, list));
							}}
						/>
					))}
				</Space>
			</div>
			<div className="extra-controls">{extra}</div>
		</div>
	);
};

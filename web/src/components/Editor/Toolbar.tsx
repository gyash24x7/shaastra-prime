import { Button, Space } from "antd";
import React from "react";
import { useSlate } from "slate-react";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import {
	HOTKEYS,
	isBlockActive,
	isMarkActive,
	LIST_TYPES,
	toggleBlock,
	toggleMark
} from "./utils";

interface ToolbarProps {
	extra?: JSX.Element;
}

export const Toolbar = ({ extra }: ToolbarProps) => {
	const editor = useSlate();

	return (
		<div className="editor-toolbar">
			<div className="rte-controls">
				<Space size="small">
					{Object.keys(HOTKEYS).map((key) => (
						<Button
							key={key}
							className="editor-btn"
							style={
								isMarkActive(editor, HOTKEYS[key])
									? { background: "#303030", color: "rgba(#fff, 0.65)" }
									: {}
							}
							size="middle"
							icon={
								<SwitchingIcon
									name={HOTKEYS[key]}
									className="editor-icon"
									isActive={isMarkActive(editor, HOTKEYS[key])}
								/>
							}
							onMouseDown={(e) => {
								e.preventDefault();
								toggleMark(editor, HOTKEYS[key]);
							}}
						/>
					))}
					{LIST_TYPES.map((list) => (
						<Button
							key={list}
							className="editor-btn"
							style={
								isBlockActive(editor, list)
									? { background: "#303030", color: "rgba(#fff, 0.65)" }
									: {}
							}
							size="middle"
							icon={
								<SwitchingIcon
									name={list}
									className="editor-icon"
									isActive={isBlockActive(editor, list)}
								/>
							}
							onMouseDown={(e) => {
								e.preventDefault();
								toggleBlock(editor, list);
							}}
						/>
					))}
				</Space>
			</div>
			<div className="extra-controls">{extra}</div>
		</div>
	);
};

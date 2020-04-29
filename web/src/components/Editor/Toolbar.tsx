import { ItalicOutlined, UnderlineOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";
import { useSlate } from "slate-react";
import { SwitchingIcon } from "../shared/SwitchingIcon";
import { HOTKEYS, isMarkActive, toggleMark } from "./utils";

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
							className="editor-btn"
							style={
								isMarkActive(editor, HOTKEYS[key])
									? { background: "#303030", color: "rgba(#fff, 0.65)" }
									: {}
							}
							size="middle"
							icon={
								<SwitchingIcon name={HOTKEYS[key]} className="editor-icon" />
							}
							onMouseDown={(e) => {
								e.preventDefault();
								toggleMark(editor, HOTKEYS[key]);
							}}
						/>
					))}
					<Button
						className="editor-btn"
						size="middle"
						icon={<ItalicOutlined />}
					/>
					<Button
						className="editor-btn"
						size="middle"
						icon={<UnderlineOutlined />}
					/>
				</Space>
			</div>
			<div className="message-controls">{extra}</div>
		</div>
	);
};

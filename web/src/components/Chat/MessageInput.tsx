import { Button, Space } from "antd";
import React from "react";
import Editor from "../Editor";
import { SwitchingIcon } from "../shared/SwitchingIcon";

export const MessageInput = () => {
	return (
		<Editor
			style={{
				height: 50,
				overflowY: "scroll"
			}}
			toolbarExtra={
				<Space>
					<Button
						className="editor-btn"
						icon={<SwitchingIcon name="upload" className="editor-icon" />}
					/>
					<Button
						className="editor-btn"
						icon={<SwitchingIcon name="send" className="editor-icon" />}
					/>
				</Space>
			}
		/>
	);
};

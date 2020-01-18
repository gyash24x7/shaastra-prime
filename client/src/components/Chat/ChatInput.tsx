import React from "react";
import { ChatEditor } from "../Editor";
import Button, { ButtonGroup } from "@atlaskit/button";
import ImageIcon from "@atlaskit/icon-file-type/glyph/image/24";
import VideoIcon from "@atlaskit/icon-file-type/glyph/video/24";
import DocumentIcon from "@atlaskit/icon-file-type/glyph/document/24";
import AudioIcon from "@atlaskit/icon-file-type/glyph/audio/24";
import CodeIcon from "@atlaskit/icon-file-type/glyph/source-code/24";

export const ChatInput = () => {
	return (
		<div className="chat-input">
			<ChatEditor />
			<div className="button-wrapper">
				<ButtonGroup appearance="subtle">
					<Button iconBefore={<ImageIcon label="" />} />
					<Button iconBefore={<VideoIcon label="" />} />
					<Button iconBefore={<DocumentIcon label="" />} />
					<Button iconBefore={<AudioIcon label="" />} />
					<Button iconBefore={<CodeIcon label="" />} />
				</ButtonGroup>
				<Button appearance="primary" className="submit-btn">
					Send
				</Button>
			</div>
		</div>
	);
};

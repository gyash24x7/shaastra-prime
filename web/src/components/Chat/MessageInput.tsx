import { Button, Space } from "antd";
import React, { useState } from "react";
import {
	refetchGetMessagesQuery,
	useCreateMessageMutation
} from "../../generated";
import { EDITOR_NULL_VALUES } from "../../utils/constants";
import Editor from "../Editor";
import { ShowError } from "../shared/ShowError";
import { SwitchingIcon } from "../shared/SwitchingIcon";

interface MessageInputProps {
	channelId: string;
}

export const MessageInput = ({ channelId }: MessageInputProps) => {
	const [content, setContent] = useState("");

	const [createMessage, { error, loading }] = useCreateMessageMutation({
		refetchQueries: [refetchGetMessagesQuery({ channelId })]
	});

	const handleSubmit = () => {
		if (content && !EDITOR_NULL_VALUES.includes(content)) {
			createMessage({ variables: { channelId, content, media: [] } });
		} else {
			console.log("here!");
		}
	};

	if (error) {
		console.log(error);
		return <ShowError />;
	}

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
						loading={loading}
						onClick={handleSubmit}
					/>
				</Space>
			}
			setSerializedValue={setContent}
		/>
	);
};

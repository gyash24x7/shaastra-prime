import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useState } from "react";

interface MediaMessageInputProps {
	handleUpload: (val: string[]) => void;
}

export const MediaMessageInput = ({ handleUpload }: MediaMessageInputProps) => {
	const [fileList, setFileList] = useState<string[]>([]);

	return (
		<div className="upload-modal-container">
			<Upload
				multiple
				action="https://api.cloudinary.com/v1_1/shaastraprime/upload"
				data={{ upload_preset: "prime-upload" }}
				listType="picture-card"
				onPreview={({ response }) => window.open(response.secure_url, "_blank")}
				onChange={({ fileList, file }) => {
					if (file.response) {
						setFileList(fileList.map((file) => file.response.secure_url));
					}
				}}
			>
				{fileList.length < 1 && (
					<div>
						<PlusOutlined />
					</div>
				)}
			</Upload>
			<div className="upload-container">
				<p>Max file size 10MB&nbsp;&nbsp;|&nbsp;&nbsp;File Limit 5</p>
				<Button
					icon={<SendOutlined />}
					size="large"
					type="primary"
					block
					disabled={fileList.length === 0}
					onClick={() => handleUpload(fileList)}
				>
					Send
				</Button>
			</div>
		</div>
	);
};

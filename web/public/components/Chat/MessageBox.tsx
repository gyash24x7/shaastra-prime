import React, { useEffect, useRef } from "react";
import Comment, { CommentAuthor, CommentTime } from "@atlaskit/comment";

interface MessageBoxProps {
	channelId: string;
}

export const MessageBox = ({ channelId }: MessageBoxProps) => {
	const myMessageStyles = {
		display: "flex",
		justifyContent: "flex-end"
	};

	console.log(channelId);

	const messages = [] as any[];
	const me = { rollNumber: "CH16B025" };

	const messageBoxRef = useRef(null);

	useEffect(() => {
		let node: any = messageBoxRef.current;
		if (node.scrollTop + node.clientHeight + 100 >= node.scrollHeight)
			node.scrollTop = node.scrollHeight;
	});

	return (
		<div className="message-box" ref={messageBoxRef}>
			{messages.map(message => (
				<div
					key={message.id}
					style={message.by.rollNumber === me.rollNumber ? {} : myMessageStyles}
				>
					<div className="comment-wrapper">
						<Comment
							avatar={<div />}
							author={
								<CommentAuthor>
									<span
										className="montserrat"
										style={{ textTransform: "capitalize" }}
									>
										{message.by.name}
									</span>
								</CommentAuthor>
							}
							type="author"
							time={
								<CommentTime>
									<span className="small">15 January</span>
								</CommentTime>
							}
							content={message.content}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

import React, { useEffect, useRef } from "react";
import Comment, { CommentAuthor, CommentTime } from "@atlaskit/comment";
import { LoremIpsum } from "lorem-ipsum";

export const MessageBox = () => {
	const myMessageStyles = { display: "flex", justifyContent: "flex-end" };

	// const [arrayLength, setArrayLength] = useState(100);

	const randomArray = Array.from(
		Array(parseInt((Math.random() * 100).toFixed(0))).keys()
	);

	const lorem = new LoremIpsum({
		sentencesPerParagraph: { min: 1, max: 8 },
		wordsPerSentence: { min: 4, max: 12 }
	});

	const messageBoxRef = useRef(null);

	useEffect(() => {
		// const node =  ReactDOM.findDOMNode()
		let node: any = messageBoxRef.current;
		// console.log(node);
		if (node.scrollTop + node.clientHeight + 100 >= node.scrollHeight)
			node.scrollTop = node.scrollHeight;
	});

	return (
		<div className="message-box" ref={messageBoxRef}>
			{randomArray.map((_, index) => {
				let num = parseInt((Math.random() * 6).toFixed(0));
				return (
					<div key={index} style={num >= 3 ? {} : myMessageStyles}>
						<div className="comment-wrapper">
							<Comment
								avatar={<div />}
								author={
									<CommentAuthor>
										<span
											className="montserrat"
											style={{ textTransform: "capitalize" }}
										>
											{lorem.generateWords(2)}
										</span>
									</CommentAuthor>
								}
								type="author"
								time={
									<CommentTime>
										<span className="small">
											{num >= 3 ? 1 : 0}
											{num} January, 20{num > 3 ? 1 : 0}
											{num}
										</span>
									</CommentTime>
								}
								content={<p>{lorem.generateParagraphs(1)}</p>}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

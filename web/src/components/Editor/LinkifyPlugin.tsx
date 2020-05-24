import { ContentBlock, ContentState } from "draft-js";
import React from "react";

export const DraftLink = (props: any) => {
	const { url } = props.contentState.getEntity(props.entityKey).getData();
	return (
		<a href={url} style={{ color: "#3b5998", textDecoration: "underline" }}>
			{props.children}
		</a>
	);
};

export const LinkStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void,
	contentState: ContentState
) => {
	contentBlock.findEntityRanges((character) => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
};

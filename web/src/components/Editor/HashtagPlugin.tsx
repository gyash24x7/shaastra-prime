import { ContentBlock } from "draft-js";
import React from "react";
import { findWithRegex } from "./utils";

export const DraftHash = (props: any) => (
	<span
		style={{ color: "rgba(95, 184, 138, 1.0)" }}
		data-offset-key={props.offsetKey}
	>
		{props.children}
	</span>
);

const HASHTAG_REGEX = /\B(#[a-zA-Z]+\b)(?!;)/g;

export const HashtagStrategy = (
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void
) => findWithRegex(HASHTAG_REGEX, contentBlock, callback);

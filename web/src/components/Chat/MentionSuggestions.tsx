import React from "react";
import { MentionState } from "../Editor/MentionPlugin";

export const MentionSuggestions = (props: MentionState) => {
	return (
		<div style={{ position: "absolute", top: props.top, left: props.left }}>
			From Message Suggestion
		</div>
	);
};
